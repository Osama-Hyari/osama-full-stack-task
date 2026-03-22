import { TransactionFormValues, TransactionPayload } from '@/app/types';

export interface TransactionFormErrors {
  amount?: string;
  categoryId?: string;
  date?: string;
}

export const defaultTransactionFormValues: TransactionFormValues = {
  amount: '',
  categoryId: '',
  date: new Date(),
  type: 'expense',
};

export function validateTransactionForm(values: TransactionFormValues) {
  const errors: TransactionFormErrors = {};
  const amount = Number(values.amount);

  if (!values.amount.trim()) {
    errors.amount = 'Amount is required.';
  } else if (Number.isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be greater than 0.';
  }

  if (!values.categoryId) {
    errors.categoryId = 'Select a category.';
  }

  if (!values.date || Number.isNaN(values.date.getTime())) {
    errors.date = 'Choose a valid date.';
  }

  return errors;
}

export function hasTransactionFormErrors(errors: TransactionFormErrors) {
  return Object.values(errors).some(Boolean);
}

export function toTransactionPayload(values: TransactionFormValues): TransactionPayload {
  return {
    amount: Number(values.amount),
    categoryId: values.categoryId,
    date: (values.date || new Date()).toISOString(),
    type: values.type,
  };
}
