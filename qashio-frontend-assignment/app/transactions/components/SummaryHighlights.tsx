'use client';

import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import { SummaryReport } from '@/app/types';
import { formatCurrency } from '@/lib/formatters';
import { useLocalization } from '@/lib/localization-context';

interface SummaryHighlightsProps {
  summary?: SummaryReport;
  isLoading: boolean;
  transactionCount: number;
  categoryCount: number;
}

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
}

function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, minHeight: 142 }}>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" component="div" sx={{ mt: 1.2, mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {helper}
      </Typography>
    </Paper>
  );
}

export default function SummaryHighlights({
  summary,
  isLoading,
  transactionCount,
  categoryCount,
}: SummaryHighlightsProps) {
  const { t } = useLocalization();

  if (isLoading) {
    return (
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {[0, 1, 2, 3].map((item) => (
          <Paper key={item} elevation={0} sx={{ p: 3, flex: 1 }}>
            <Skeleton height={24} width="32%" />
            <Skeleton height={48} width="74%" />
            <Skeleton height={20} width="56%" />
          </Paper>
        ))}
      </Stack>
    );
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <MetricCard
        label={t('summary.income')}
        value={formatCurrency(summary?.totalIncome || 0)}
        helper={t('summary.incomeHelp')}
      />
      <MetricCard
        label={t('summary.expense')}
        value={formatCurrency(summary?.totalExpense || 0)}
        helper={t('summary.expenseHelp')}
      />
      <MetricCard
        label={t('summary.net')}
        value={formatCurrency(summary?.net || 0)}
        helper={t('summary.netHelp')}
      />
      <MetricCard
        label={t('summary.coverage')}
        value={`${transactionCount} txns / ${categoryCount} cats`}
        helper={t('summary.coverageHelp')}
      />
    </Stack>
  );
}
