"use client";
import { useCategoriesQuery, useBudgetsQuery, useBudgetUsagesQuery } from '@/app/hooks/useExpenseTrackerQueries';
import CategoryBudgetOperations from '../transactions/components/CategoryBudgetOperations';
import BudgetInsights from '../transactions/components/BudgetInsights';
import { Stack } from '@mui/material';

export default function BudgetsPage() {
  const categoriesQuery = useCategoriesQuery();
  const budgetsQuery = useBudgetsQuery();
  const featuredBudgets = (budgetsQuery.data || []).slice(0, 4);
  const budgetUsageQueries = useBudgetUsagesQuery(featuredBudgets.map((budget) => budget.id));
  const budgetInsights = featuredBudgets.map((budget, index) => ({
    budget,
    usage: budgetUsageQueries[index]?.data,
    isLoading: budgetUsageQueries[index]?.isLoading,
  }));

  return (
    <Stack spacing={3} sx={{ p: 4 }}>
      <CategoryBudgetOperations
        categories={categoriesQuery.data || []}
        categoriesLoading={categoriesQuery.isLoading}
        categoriesError={!!categoriesQuery.error}
        budgets={budgetInsights}
        budgetsLoading={budgetsQuery.isLoading}
        budgetsError={!!budgetsQuery.error}
        budgetErrorMessage={budgetsQuery.error ? String(budgetsQuery.error) : undefined}
        focusSection="all"
      />
      <BudgetInsights
        budgets={budgetInsights}
        isLoading={budgetsQuery.isLoading}
        isError={!!budgetsQuery.error}
        errorMessage={budgetsQuery.error ? String(budgetsQuery.error) : undefined}
      />
    </Stack>
  );
}
