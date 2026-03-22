'use client';

import {
  keepPreviousData,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { expenseTrackerApi } from '@/lib/api-client';
import { BudgetPayload, CategoryPayload, TransactionFilters, TransactionPayload } from '@/app/types';

function toIsoDate(date: Date | null, boundary: 'start' | 'end') {
  if (!date) {
    return undefined;
  }

  const copy = new Date(date);
  if (boundary === 'start') {
    copy.setHours(0, 0, 0, 0);
  } else {
    copy.setHours(23, 59, 59, 999);
  }

  return copy.toISOString();
}

export function useTransactionsQuery(filters: TransactionFilters) {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () =>
      expenseTrackerApi.getTransactions({
        page: filters.pagination.page + 1,
        limit: filters.pagination.pageSize,
        sortBy: filters.sorting.field,
        sortOrder: filters.sorting.direction === 'asc' ? 'ASC' : 'DESC',
        type: filters.type,
        categoryId: filters.categoryId,
        dateFrom: toIsoDate(filters.dateRange.startDate, 'start'),
        dateTo: toIsoDate(filters.dateRange.endDate, 'end'),
        minAmount: filters.amountRange.min || undefined,
        maxAmount: filters.amountRange.max || undefined,
      }),
    placeholderData: keepPreviousData,
  });
}

export function useTransactionDetailQuery(id: string | null) {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => expenseTrackerApi.getTransaction(id as string),
    enabled: Boolean(id),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: expenseTrackerApi.getCategories,
  });
}

export function useBudgetsQuery() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: expenseTrackerApi.getBudgets,
  });
}

export function useBudgetUsagesQuery(budgetIds: string[]) {
  return useQueries({
    queries: budgetIds.map((budgetId) => ({
      queryKey: ['budget-usage', budgetId],
      queryFn: () => expenseTrackerApi.getBudgetUsage(budgetId),
      enabled: Boolean(budgetId),
    })),
  });
}

export function useSummaryQuery(filters: TransactionFilters) {
  return useQuery({
    queryKey: ['summary', filters.dateRange.startDate, filters.dateRange.endDate],
    queryFn: () =>
      expenseTrackerApi.getSummary(
        toIsoDate(filters.dateRange.startDate, 'start'),
        toIsoDate(filters.dateRange.endDate, 'end'),
      ),
  });
}

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TransactionPayload) => expenseTrackerApi.createTransaction(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: ['summary'] }),
        queryClient.invalidateQueries({ queryKey: ['budget-usage'] }),
      ]);
    },
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CategoryPayload) => expenseTrackerApi.createCategory(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ]);
    },
  });
}

export function useCreateBudgetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BudgetPayload) => expenseTrackerApi.createBudget(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['budgets'] }),
        queryClient.invalidateQueries({ queryKey: ['budget-usage'] }),
      ]);
    },
  });
}
