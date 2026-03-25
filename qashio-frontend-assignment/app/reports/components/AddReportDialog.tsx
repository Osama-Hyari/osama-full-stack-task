import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Button } from '@mui/material';

interface AddReportDialogProps {
  open: boolean;
  dateFrom: string;
  dateTo: string;
  loading: boolean;
  error: string | null;
  jobId: string | null;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddReportDialog({
  open,
  dateFrom,
  dateTo,
  loading,
  error,
  jobId,
  onDateFromChange,
  onDateToChange,
  onClose,
  onSubmit,
}: AddReportDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Report</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            label="Date From"
            type="date"
            value={dateFrom}
            onChange={e => onDateFromChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date To"
            type="date"
            value={dateTo}
            onChange={e => onDateToChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" mt={2}>{error}</Typography>
          )}
          {jobId && (
            <Typography color="success.main" mt={2}>Job started! Job ID: {jobId}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
