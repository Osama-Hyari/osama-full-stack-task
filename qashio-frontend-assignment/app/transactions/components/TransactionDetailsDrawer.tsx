'use client';

import {
  Alert,
  Box,
  Chip,
  Divider,
  Drawer,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useTransactionDetailQuery } from '@/app/hooks/useExpenseTrackerQueries';
import {
  capitalize,
  formatCurrency,
  formatDateTime,
  getTypeTone,
} from '@/lib/formatters';

interface TransactionDetailsDrawerProps {
  transactionId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function TransactionDetailsDrawer({
  transactionId,
  open,
  onClose,
}: TransactionDetailsDrawerProps) {
  const { data, isLoading, isError, error } = useTransactionDetailQuery(transactionId);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, p: 3 } }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Transaction Detail
          </Typography>
          <Typography variant="h5">Full record inspection</Typography>
        </Box>

        {isLoading ? (
          <Stack spacing={1.2}>
            <Skeleton height={40} width="46%" />
            <Skeleton height={24} width="78%" />
            <Skeleton height={160} />
          </Stack>
        ) : null}

        {isError ? <Alert severity="error">{(error as Error).message}</Alert> : null}

        {data ? (
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">{formatCurrency(data.amount)}</Typography>
              <Chip label={capitalize(data.type)} color={getTypeTone(data.type)} variant="outlined" />
            </Stack>
            <Divider />
            <DetailRow label="Category" value={data.category?.name || data.categoryId} />
            <DetailRow label="Transaction date" value={formatDateTime(data.date)} />
            <DetailRow label="Transaction id" value={data.id} />
            <DetailRow label="Created at" value={data.createdAt ? formatDateTime(data.createdAt) : 'N/A'} />
            <DetailRow label="Updated at" value={data.updatedAt ? formatDateTime(data.updatedAt) : 'N/A'} />
          </Stack>
        ) : null}
      </Stack>
    </Drawer>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={700} sx={{ mt: 0.5, wordBreak: 'break-word' }}>
        {value}
      </Typography>
    </Box>
  );
}
