'use client';

import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Category } from '@/app/types';
import { useTransactionStore } from '@/app/hooks/useTransactionStore';
import { useLocalization } from '@/lib/localization-context';

interface TransactionFiltersPanelProps {
  categories: Category[];
}

export default function TransactionFiltersPanel({ categories }: TransactionFiltersPanelProps) {
  const { t } = useLocalization();
  const filters = useTransactionStore((state) => state.filters);
  const setSearchTerm = useTransactionStore((state) => state.setSearchTerm);
  const setType = useTransactionStore((state) => state.setType);
  const setCategoryId = useTransactionStore((state) => state.setCategoryId);
  const setDateRange = useTransactionStore((state) => state.setDateRange);
  const setAmountRange = useTransactionStore((state) => state.setAmountRange);
  const resetFilters = useTransactionStore((state) => state.resetFilters);

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
        <BoxTitle
          title={t('filters.title')}
          subtitle={t('filters.subtitle')}
        />
        <Button onClick={resetFilters} variant="text" color="inherit">
          {t('filters.reset')}
        </Button>
      </Stack>

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={2}
        sx={{ mt: 3, alignItems: { lg: 'center' } }}
      >
        <TextField
          label={t('filters.quick')}
          value={filters.searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={t('filters.placeholder')}
          fullWidth
        />
        <TextField
          select
          label={t('filters.type')}
          value={filters.type}
          onChange={(event) => setType(event.target.value as 'all' | 'income' | 'expense')}
          sx={{ minWidth: 170 }}
        >
          <MenuItem value="all">{t('filters.allTypes')}</MenuItem>
          <MenuItem value="income">{t('filters.income')}</MenuItem>
          <MenuItem value="expense">{t('filters.expense')}</MenuItem>
        </TextField>
        <TextField
          select
          label={t('filters.category')}
          value={filters.categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          sx={{ minWidth: 210 }}
        >
          <MenuItem value="">{t('filters.allCategories')}</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ mt: 2 }}>
        <DatePicker
          label={t('filters.from')}
          value={filters.dateRange.startDate}
          onChange={(date) => setDateRange(date, filters.dateRange.endDate)}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <DatePicker
          label={t('filters.to')}
          value={filters.dateRange.endDate}
          onChange={(date) => setDateRange(filters.dateRange.startDate, date)}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <TextField
          type="number"
          label={t('filters.minAmount')}
          value={filters.amountRange.min}
          onChange={(event) => setAmountRange('min', event.target.value)}
          fullWidth
        />
        <TextField
          type="number"
          label={t('filters.maxAmount')}
          value={filters.amountRange.max}
          onChange={(event) => setAmountRange('max', event.target.value)}
          fullWidth
        />
      </Stack>
    </Paper>
  );
}

function BoxTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Stack spacing={0.75}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Stack>
  );
}
