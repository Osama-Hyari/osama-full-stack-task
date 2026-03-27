import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseTrackerApi } from '@/lib/api-client';
import { TransactionPayload } from '@/app/types';

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TransactionPayload }) =>
      expenseTrackerApi.updateTransaction(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
      await queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });
}

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseTrackerApi.deleteTransaction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
      await queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });
}
