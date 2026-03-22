'use client';

import {
  Alert,
  Chip,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Budget, BudgetUsage } from '@/app/types';
import { formatCurrency, formatDate, getBudgetTone } from '@/lib/formatters';
import { useLocalization } from '@/lib/localization-context';

interface BudgetInsightItem {
  budget: Budget;
  usage?: BudgetUsage;
  isLoading?: boolean;
}

interface BudgetInsightsProps {
  budgets: BudgetInsightItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export default function BudgetInsights({
  budgets,
  isLoading,
  isError,
  errorMessage,
}: BudgetInsightsProps) {
  const { t } = useLocalization();

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h6">{t('budget.watchlist')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('budget.subtitle')}
        </Typography>
      </Stack>

      {isLoading ? (
        <Stack spacing={2}>
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} height={98} />
          ))}
        </Stack>
      ) : null}

      {isError ? <Alert severity="error">{errorMessage}</Alert> : null}

      {!isLoading && !isError && budgets.length === 0 ? (
        <Alert severity="info">{t('budget.none')}</Alert>
      ) : null}

      <Stack spacing={2}>
        {budgets.map(({ budget, usage, isLoading: usageLoading }) => (
          <Paper key={budget.id} variant="outlined" sx={{ p: 2.25 }}>
            <Stack spacing={1.3}>
              <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-start">
                <Stack>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {budget.category?.name || budget.categoryId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(budget.periodStart)} to {formatDate(budget.periodEnd)}
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  color={usage ? getBudgetTone(usage) : 'default'}
                  label={usage?.overBudget ? t('budget.over') : t('budget.onTrack')}
                  variant="outlined"
                />
              </Stack>

              <Typography variant="body2" color="text.secondary">
                {t('budget.budgeted')} {formatCurrency(budget.amount)}
              </Typography>

              {usageLoading ? <Skeleton height={28} /> : null}

              {usage ? (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(usage.percentageUsed, 100)}
                    color={getBudgetTone(usage)}
                    sx={{ height: 10, borderRadius: 999 }}
                  />
                  <Stack direction="row" justifyContent="space-between" spacing={1}>
                    <Typography variant="body2">{t('budget.spent')} {formatCurrency(usage.spent)}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('budget.remaining')} {formatCurrency(usage.remaining)}
                    </Typography>
                  </Stack>
                </>
              ) : null}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
