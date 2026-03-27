
'use client';
import React from 'react';

import {
  Alert,
  Box,
  Chip,
  Divider,
  Drawer,
  Skeleton,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useTransactionDetailQuery } from '@/app/hooks/useExpenseTrackerQueries';
import { useUpdateTransactionMutation, useDeleteTransactionMutation } from '@/app/hooks/useTransactionMutations';
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
  const updateMutation = useUpdateTransactionMutation();
  const deleteMutation = useDeleteTransactionMutation();
  const [editOpen, setEditOpen] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    amount: '',
    categoryId: '',
    date: '',
    type: 'expense',
  });
  React.useEffect(() => {
    if (data && editOpen) {
      setEditForm({
        amount: String(data.amount),
        categoryId: data.categoryId,
        date: data.date.slice(0, 16),
        type: data.type,
      });
    }
  }, [data, editOpen]);

  const handleEdit = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async () => {
    if (!transactionId) return;
    await updateMutation.mutateAsync({
      id: transactionId,
      payload: {
        amount: Number(editForm.amount),
        categoryId: editForm.categoryId,
        date: editForm.date,
        type: editForm.type as any,
      },
    });
    setEditOpen(false);
    onClose();
  };
  const handleDelete = async () => {
    if (!transactionId) return;
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    await deleteMutation.mutateAsync(transactionId);
    onClose();
  };

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
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleEdit} disabled={updateMutation.isPending}>Edit</Button>
              <Button variant="outlined" color="error" onClick={handleDelete} disabled={deleteMutation.isPending}>Delete</Button>
            </Stack>
          </Stack>
        ) : null}
        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Amount" name="amount" type="number" value={editForm.amount} onChange={handleEditChange} fullWidth />
              <TextField label="Category ID" name="categoryId" value={editForm.categoryId} onChange={handleEditChange} fullWidth />
              <TextField label="Date" name="date" type="datetime-local" value={editForm.date} onChange={handleEditChange} fullWidth />
              <TextField label="Type" name="type" value={editForm.type} onChange={handleEditChange} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary" disabled={updateMutation.isPending}>Save</Button>
          </DialogActions>
        </Dialog>
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
