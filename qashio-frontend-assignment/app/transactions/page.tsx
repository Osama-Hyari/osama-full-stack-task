'use client';

import { Suspense, useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocalization } from '@/lib/localization-context';
import {
  useBudgetUsagesQuery,
  useBudgetsQuery,
  useCategoriesQuery,
  useSummaryQuery,
  useTransactionsQuery,
} from '@/app/hooks/useExpenseTrackerQueries';
import { useTransactionStore } from '@/app/hooks/useTransactionStore';
import BudgetInsights from './components/BudgetInsights';
import CategoryBudgetOperations from './components/CategoryBudgetOperations';
import SummaryHighlights from './components/SummaryHighlights';
import TransactionDetailsDrawer from './components/TransactionDetailsDrawer';
import TransactionFiltersPanel from './components/TransactionFiltersPanel';
import TransactionsTable from './components/TransactionsTable';
import WorkspaceTransactionsView from './components/WorkspaceTransactionsView';

function CreatedBanner() {
  const { t } = useLocalization();
  const searchParams = useSearchParams();
  if (searchParams.get('created') !== '1') return null;
  return <Alert severity="success">{t('page.createdSuccess')}</Alert>;
}

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const { t } = useLocalization();
  const filters = useTransactionStore((state) => state.filters);
  const deferredSearch = useDeferredValue(filters.searchTerm);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'workspace'>('dashboard');
  const section = searchParams.get('section');
  const activeNav: 'transactions' | 'categories' | 'budgets' =
    section === 'categories' || section === 'budgets' ? section : 'transactions';

  const categoriesQuery = useCategoriesQuery();
  const transactionsQuery = useTransactionsQuery(filters);
  const summaryQuery = useSummaryQuery(filters);
  const budgetsQuery = useBudgetsQuery();
  const featuredBudgets = (budgetsQuery.data || []).slice(0, 4);
  const budgetUsageQueries = useBudgetUsagesQuery(featuredBudgets.map((budget) => budget.id));

  const rows = useMemo(() => {
    const serverRows = transactionsQuery.data?.data || [];
    if (!deferredSearch.trim()) {
      return serverRows;
    }

    const term = deferredSearch.toLowerCase();
    return serverRows.filter((transaction) => {
      const categoryName = transaction.category?.name?.toLowerCase() || '';
      return (
        transaction.type.toLowerCase().includes(term) ||
        categoryName.includes(term) ||
        String(transaction.amount).includes(term)
      );
    });
  }, [deferredSearch, transactionsQuery.data?.data]);

  const budgetInsights = featuredBudgets.map((budget, index) => ({
    budget,
    usage: budgetUsageQueries[index]?.data,
    isLoading: budgetUsageQueries[index]?.isLoading,
  }));

  return (
    <Stack spacing={2.5}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          spacing={2}
          alignItems={{ lg: 'center' }}
        >
          <Box>
            <Typography variant="h4" component="h1">
              {t('page.transactionsTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6 }}>
              {t('page.transactionsSubtitle')}
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} alignItems={{ sm: 'center' }}>
            <ToggleButtonGroup
              size="small"
              value={viewMode}
              exclusive
              onChange={(_event, nextMode) => {
                if (nextMode) setViewMode(nextMode);
              }}
            >
              <ToggleButton value="dashboard">{t('page.dashboard')}</ToggleButton>
              <ToggleButton value="workspace">{t('page.workspace')}</ToggleButton>
            </ToggleButtonGroup>
            <Button component={Link} href="/transactions/new" variant="contained" color="secondary">
              {t('page.addTransaction')}
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
          {transactionsQuery.isFetching ? <CircularProgress size={16} /> : null}
          <Typography variant="caption" color="text.secondary">
            {transactionsQuery.isFetching ? t('page.refreshing') : t('page.synced')}
          </Typography>
        </Stack>
      </Paper>

      <Suspense fallback={null}>
        <CreatedBanner />
      </Suspense>

      <Stack spacing={2.5}>
        {activeNav === 'transactions' ? (
          viewMode === 'dashboard' ? (
            <>
              <SummaryHighlights
                isLoading={summaryQuery.isLoading}
                summary={summaryQuery.data}
                categoryCount={categoriesQuery.data?.length || 0}
                transactionCount={transactionsQuery.data?.total || 0}
              />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', xl: '1.6fr 1fr' },
                  gap: 2.5,
                  alignItems: 'start',
                }}
              >
                <Stack spacing={2.5}>
                  <TransactionFiltersPanel categories={categoriesQuery.data || []} />
                  <TransactionsTable
                    rows={rows}
                    rowCount={transactionsQuery.data?.total || 0}
                    loading={transactionsQuery.isLoading}
                    fetching={transactionsQuery.isFetching}
                    onOpenDetails={setSelectedTransactionId}
                  />
                  {transactionsQuery.isError ? (
                    <Alert severity="error">{(transactionsQuery.error as Error).message}</Alert>
                  ) : null}
                </Stack>

                <BudgetInsights
                  budgets={budgetInsights}
                  isLoading={budgetsQuery.isLoading}
                  isError={budgetsQuery.isError}
                  errorMessage={budgetsQuery.isError ? (budgetsQuery.error as Error).message : undefined}
                />
              </Box>
            </>
          ) : (
            <>
              <WorkspaceTransactionsView
                rows={rows}
                rowCount={transactionsQuery.data?.total || 0}
                loading={transactionsQuery.isLoading}
                fetching={transactionsQuery.isFetching}
                onOpenDetails={setSelectedTransactionId}
              />
              {transactionsQuery.isError ? (
                <Alert severity="error">{(transactionsQuery.error as Error).message}</Alert>
              ) : null}
            </>
          )
        ) : (
          <CategoryBudgetOperations
            categories={categoriesQuery.data || []}
            categoriesLoading={categoriesQuery.isLoading}
            categoriesError={categoriesQuery.isError}
            budgets={budgetInsights}
            budgetsLoading={budgetsQuery.isLoading}
            budgetsError={budgetsQuery.isError}
            budgetErrorMessage={budgetsQuery.isError ? (budgetsQuery.error as Error).message : undefined}
            focusSection={activeNav}
          />
        )}
      </Stack>

      <TransactionDetailsDrawer
        transactionId={selectedTransactionId}
        open={Boolean(selectedTransactionId)}
        onClose={() => setSelectedTransactionId(null)}
      />
    </Stack>
  );
}
