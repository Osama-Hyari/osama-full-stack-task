"use client";
import { useEffect, useState, useRef, ReactElement } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useTransactionEvents } from '@/hooks/useTransactionEvents';
import { useLoginEvents } from '@/hooks/useLoginEvents';

function SlideTransition(props: any) {
  return <Slide {...props} direction="down" />;
}

const EVENT_DURATION = 6000;
const MAX_STACK = 3; // Show up to 3 stacked notifications

type EventType = 'info' | 'success' | 'warning' | 'error';

interface EventNotification {
  message: string;
  severity: EventType;
  icon: ReactElement;
  action?: ReactElement;
  key: number;
}

export default function KafkaEventsSnackbar() {
  const [stack, setStack] = useState<EventNotification[]>([]);
  const keyRef = useRef(0);

  // Helper to add a notification to the stack
  const pushNotification = (notif: Omit<EventNotification, 'key'>) => {
    setStack((prev) => {
      const next = [...prev, { ...notif, key: keyRef.current++ }];
      // Only keep the last MAX_STACK notifications
      return next.slice(-MAX_STACK);
    });
  };

  useTransactionEvents((event) => {
    let severity: EventType = 'info';
    let icon = <InfoIcon fontSize="inherit" sx={{ mr: 1 }} />;
    let action;
    if (event.event === 'deleted') {
      severity = 'warning';
      icon = <WarningIcon fontSize="inherit" sx={{ mr: 1 }} />;
    } else if (event.event === 'updated') {
      severity = 'success';
      icon = <CheckCircleIcon fontSize="inherit" sx={{ mr: 1 }} />;
      action = <Button color="inherit" size="small" onClick={() => window.location.reload()}>Refresh</Button>;
    }
    pushNotification({
      message: `Transaction ${event.event || 'created'}${event.amount !== undefined ? ` (amount: ${event.amount})` : ''}`,
      severity,
      icon,
      action,
    });
  });

  useLoginEvents((event) => {
    pushNotification({
      message: `Login: ${event.email} at ${new Date(event.timestamp).toLocaleTimeString()}`,
      severity: 'success',
      icon: <CheckCircleIcon fontSize="inherit" sx={{ mr: 1 }} />,
      action: <Button color="inherit" size="small" onClick={() => alert('Welcome!')}>Welcome</Button>,
    });
  });

  // Remove notification from stack
  const handleClose = (key: number) => (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setStack((prev) => prev.filter((n) => n.key !== key));
  };

  return (
    <div aria-live="polite" aria-atomic="true" style={{ position: 'fixed', zIndex: 1400, top: 16, right: 16, left: 'auto' }}>
      {stack.map((notif, idx) => (
        <Snackbar
          key={notif.key}
          open
          autoHideDuration={EVENT_DURATION}
          onClose={handleClose(notif.key)}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mb: idx * 8 }}
        >
          <Alert
            icon={notif.icon}
            onClose={handleClose(notif.key)}
            severity={notif.severity}
            sx={{ width: '100%', fontSize: 16, alignItems: 'center', background: notif.severity === 'warning' ? '#fffbe6' : undefined }}
            action={
              <>
                {notif.action}
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose(notif.key)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </>
            }
          >
            {notif.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}
