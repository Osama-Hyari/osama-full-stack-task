'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { alpha } from '@mui/material/styles';
import {
  useCreateBudgetMutation,
  useCreateCategoryMutation,
} from '@/app/hooks/useExpenseTrackerQueries';
import { Budget, BudgetUsage, Category } from '@/app/types';
import { formatCurrency, formatDate, getBudgetTone } from '@/lib/formatters';

interface BudgetInsightItem {
  budget: Budget;
  usage?: BudgetUsage;
  isLoading?: boolean;
}

interface CategoryBudgetOperationsProps {
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: boolean;
  budgets: BudgetInsightItem[];
  budgetsLoading: boolean;
  budgetsError: boolean;
  budgetErrorMessage?: string;
  focusSection?: 'all' | 'categories' | 'budgets';
}

export default function CategoryBudgetOperations({
  categories,
  categoriesLoading,
  categoriesError,
  budgets,
  budgetsLoading,
  budgetsError,
  budgetErrorMessage,
  focusSection = 'all',
}: CategoryBudgetOperationsProps) {
  const createCategoryMutation = useCreateCategoryMutation();
  const createBudgetMutation = useCreateBudgetMutation();

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetCategoryId, setBudgetCategoryId] = useState('');
  const [budgetStartDate, setBudgetStartDate] = useState<Date | null>(new Date());
  const [budgetEndDate, setBudgetEndDate] = useState<Date | null>(new Date());
  const [categoryAttempted, setCategoryAttempted] = useState(false);
  const [budgetAttempted, setBudgetAttempted] = useState(false);

  const categoryNameError = !categoryName.trim() ? 'Category name is required.' : '';
  const budgetAmountNumber = Number(budgetAmount);
  const budgetAmountError =
    !budgetAmount.trim() || Number.isNaN(budgetAmountNumber) || budgetAmountNumber <= 0
      ? 'Budget amount must be greater than 0.'
      : '';
  const budgetCategoryError = !budgetCategoryId ? 'Select a category.' : '';
  const budgetDateError =
    !budgetStartDate || !budgetEndDate || budgetEndDate < budgetStartDate
      ? 'Choose a valid period range.'
      : '';

  const submitCategory = async () => {
    setCategoryAttempted(true);

    if (categoryNameError) {
      return;
    }

    await createCategoryMutation.mutateAsync({ name: categoryName.trim() });
    setCategoryName('');
    setCategoryAttempted(false);
    setCategoryDialogOpen(false);
  };

  const submitBudget = async () => {
    setBudgetAttempted(true);

    if (budgetAmountError || budgetCategoryError || budgetDateError || !budgetStartDate || !budgetEndDate) {
      return;
    }

    await createBudgetMutation.mutateAsync({
      amount: budgetAmountNumber,
      categoryId: budgetCategoryId,
      periodStart: budgetStartDate.toISOString(),
      periodEnd: budgetEndDate.toISOString(),
    });

    setBudgetAmount('');
    setBudgetCategoryId('');
    setBudgetStartDate(new Date());
    setBudgetEndDate(new Date());
    setBudgetAttempted(false);
    setBudgetDialogOpen(false);
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 } }}>
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          spacing={2}
          alignItems={{ lg: 'center' }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.14em' }}>
              Categories And Budgets
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.75 }}>
              Manage categories and budget tracking directly from the frontend workspace.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>
              Create categories, assign every transaction to a category, and manage budgets per category over a time period with live spending visibility.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button variant="outlined" color="inherit" onClick={() => setCategoryDialogOpen(true)}>
              Create category
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setBudgetDialogOpen(true)}
              disabled={categories.length === 0}
            >
              Set budget
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns:
              focusSection === 'all'
                ? { xs: '1fr', xl: '0.95fr 1.05fr' }
                : { xs: '1fr' },
            gap: 2,
            alignItems: 'start',
          }}
        >
          {focusSection !== 'budgets' ? (
          <Paper elevation={0} sx={{ p: 2, backgroundColor: alpha('#14532d', 0.04) }}>
            <Stack spacing={1.75}>
              <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    Category list
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    These categories feed the transaction form and table filters.
                  </Typography>
                </Box>
                <Chip label={categoriesLoading ? 'Loading' : `${categories.length} categories`} color="primary" />
              </Stack>

              {createCategoryMutation.isError ? (
                <Alert severity="error">{(createCategoryMutation.error as Error).message}</Alert>
              ) : null}

              {categoriesError ? <Alert severity="error">Unable to load categories.</Alert> : null}

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {categories.map((category) => (
                  <Chip key={category.id} label={category.name} variant="outlined" />
                ))}
                {!categoriesLoading && categories.length === 0 ? (
                  <Alert severity="info" sx={{ width: '100%' }}>
                    No categories available yet. Create your first category to start tagging transactions.
                  </Alert>
                ) : null}
              </Stack>

              <Paper elevation={0} sx={{ p: 1.5, backgroundColor: alpha('#ffffff', 0.72) }}>
                <Stack spacing={0.75}>
                  <Typography variant="body2" fontWeight={700}>
                    Transaction category requirement
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Every transaction created in this frontend must select a category before submission.
                  </Typography>
                  <Button component={Link} href="/transactions/new" variant="text" sx={{ width: 'fit-content', px: 0 }}>
                    Open transaction form
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
          ) : null}

          {focusSection !== 'categories' ? (
          <Paper elevation={0} sx={{ p: 2, backgroundColor: alpha('#b45309', 0.05) }}>
            <Stack spacing={1.75}>
              <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    Budget tracking
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Budgets are set per category and period, then compared against current spend.
                  </Typography>
                </Box>
                <Chip label={budgetsLoading ? 'Loading' : `${budgets.length} budgets`} color="secondary" />
              </Stack>

              {createBudgetMutation.isError ? (
                <Alert severity="error">{(createBudgetMutation.error as Error).message}</Alert>
              ) : null}

              {budgetsError ? <Alert severity="error">{budgetErrorMessage || 'Unable to load budgets.'}</Alert> : null}

              {!budgetsLoading && !budgetsError && budgets.length === 0 ? (
                <Alert severity="info">
                  No budgets created yet. Use “Set budget” to assign a spending limit to a category and time period.
                </Alert>
              ) : null}

              <Stack spacing={1.25}>
                {budgets.map(({ budget, usage, isLoading }) => (
                  <Paper key={budget.id} elevation={0} sx={{ p: 1.5, backgroundColor: alpha('#ffffff', 0.8) }}>
                    <Stack spacing={1.1}>
                      <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-start">
                        <Box>
                          <Typography variant="body2" fontWeight={700}>
                            {budget.category?.name || budget.categoryId}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(budget.periodStart)} to {formatDate(budget.periodEnd)}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          color={usage ? getBudgetTone(usage) : 'default'}
                          label={usage?.overBudget ? 'Over budget' : 'On track'}
                          variant="outlined"
                        />
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        Budgeted {formatCurrency(budget.amount)}
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={Math.min(usage?.percentageUsed || 0, 100)}
                        color={usage ? getBudgetTone(usage) : 'primary'}
                        sx={{ height: 8, borderRadius: 999 }}
                      />

                      <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          {isLoading ? 'Calculating usage...' : `Spent ${formatCurrency(usage?.spent || 0)}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Remaining {formatCurrency(usage?.remaining ?? budget.amount)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Paper>
          ) : null}
        </Box>
      </Stack>

      <Dialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Create category</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Category name"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              error={categoryAttempted && Boolean(categoryNameError)}
              helperText={categoryAttempted && categoryNameError ? categoryNameError : 'Create a category for transaction assignment.'}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={submitCategory} variant="contained" disabled={createCategoryMutation.isPending}>
            {createCategoryMutation.isPending ? 'Creating...' : 'Create category'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={budgetDialogOpen} onClose={() => setBudgetDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Set budget</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Budget amount"
                type="number"
                value={budgetAmount}
                onChange={(event) => setBudgetAmount(event.target.value)}
                error={budgetAttempted && Boolean(budgetAmountError)}
                helperText={budgetAttempted && budgetAmountError ? budgetAmountError : 'Set a positive amount for the selected period.'}
                fullWidth
              />
              <TextField
                select
                label="Category"
                value={budgetCategoryId}
                onChange={(event) => setBudgetCategoryId(event.target.value)}
                error={budgetAttempted && Boolean(budgetCategoryError)}
                helperText={budgetAttempted && budgetCategoryError ? budgetCategoryError : 'Choose the category this budget applies to.'}
                fullWidth
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <DatePicker
                label="Period start"
                value={budgetStartDate}
                onChange={(value) => setBudgetStartDate(value)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="Period end"
                value={budgetEndDate}
                onChange={(value) => setBudgetEndDate(value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: budgetAttempted && Boolean(budgetDateError),
                    helperText: budgetAttempted && budgetDateError ? budgetDateError : 'Choose the budget end date.',
                  },
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setBudgetAttempted(false);
              setBudgetDialogOpen(false);
            }}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={submitBudget}
            variant="contained"
            color="secondary"
            disabled={createBudgetMutation.isPending || categories.length === 0}
          >
            {createBudgetMutation.isPending ? 'Saving...' : 'Save budget'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}