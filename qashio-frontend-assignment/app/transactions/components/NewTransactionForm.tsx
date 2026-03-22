'use client';

import { useState } from 'react';
import {
  Alert,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import { useCategoriesQuery, useCreateTransactionMutation } from '@/app/hooks/useExpenseTrackerQueries';
import { TransactionFormValues } from '@/app/types';
import {
  defaultTransactionFormValues,
  hasTransactionFormErrors,
  toTransactionPayload,
  validateTransactionForm,
} from '@/lib/transaction-form';

export default function NewTransactionForm() {
  const router = useRouter();
  const categoriesQuery = useCategoriesQuery();
  const createTransactionMutation = useCreateTransactionMutation();
  const [values, setValues] = useState<TransactionFormValues>(defaultTransactionFormValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = validateTransactionForm(values);

  const setField = <K extends keyof TransactionFormValues>(field: K, value: TransactionFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ amount: true, categoryId: true, date: true });

    if (hasTransactionFormErrors(errors)) {
      return;
    }

    await createTransactionMutation.mutateAsync(toTransactionPayload(values));
    router.push('/transactions?created=1');
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
      <Stack component="form" spacing={2.5} onSubmit={submit}>
        <Stack spacing={0.75}>
          <Typography variant="h5">Transaction details</Typography>
          <Typography variant="body2" color="text.secondary">
            Submit clean payloads to the backend using the assignment contract: amount, categoryId, date, and type.
          </Typography>
        </Stack>

        {createTransactionMutation.isError ? (
          <Alert severity="error">{(createTransactionMutation.error as Error).message}</Alert>
        ) : null}

        {categoriesQuery.isError ? (
          <Alert severity="error">{(categoriesQuery.error as Error).message}</Alert>
        ) : null}

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Amount"
            type="number"
            value={values.amount}
            onChange={(event) => setField('amount', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, amount: true }))}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount ? errors.amount : 'Use a positive numeric value.'}
            fullWidth
          />
          <TextField
            select
            label="Type"
            value={values.type}
            onChange={(event) => setField('type', event.target.value as TransactionFormValues['type'])}
            fullWidth
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </TextField>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            select
            label="Category"
            value={values.categoryId}
            onChange={(event) => setField('categoryId', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, categoryId: true }))}
            error={Boolean(touched.categoryId && errors.categoryId)}
            helperText={touched.categoryId ? errors.categoryId : 'Categories are loaded from the backend.'}
            fullWidth
            disabled={categoriesQuery.isLoading}
          >
            {categoriesQuery.isLoading ? (
              <MenuItem value="" disabled>Loading categories…</MenuItem>
            ) : (
              (categoriesQuery.data ?? []).map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))
            )}
          </TextField>
          <DatePicker
            label="Date"
            value={values.date}
            onChange={(date) => setField('date', date)}
            slotProps={{
              textField: {
                fullWidth: true,
                onBlur: () => setTouched((current) => ({ ...current, date: true })),
                error: Boolean(touched.date && errors.date),
                helperText: touched.date ? errors.date : 'Select the transaction date.',
              },
            }}
          />
        </Stack>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button variant="text" color="inherit" onClick={() => router.push('/transactions')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={createTransactionMutation.isPending}>
            {createTransactionMutation.isPending ? 'Saving...' : 'Create transaction'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}