import { BudgetUsage, TransactionType } from '@/app/types';

const currencyFormatter = new Intl.NumberFormat('en-AE', {
  style: 'currency',
  currency: 'AED',
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getTypeTone(type: TransactionType) {
  return type === 'income' ? 'success' : 'warning';
}

export function getBudgetTone(usage: BudgetUsage) {
  if (usage.overBudget) {
    return 'error';
  }

  if (usage.percentageUsed >= 80) {
    return 'warning';
  }

  return 'success';
}
