'use client';

import { MouseEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Skeleton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Transaction } from '@/app/types';
import { useTransactionStore } from '@/app/hooks/useTransactionStore';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { useLocalization } from '@/lib/localization-context';

interface WorkspaceTransactionsViewProps {
  rows: Transaction[];
  rowCount: number;
  loading: boolean;
  fetching: boolean;
  onOpenDetails: (id: string) => void;
}

type WorkspaceStatusFilter = 'all' | 'active' | 'inactive';

function getRowStatus(date: string) {
  const now = new Date();
  const transactionDate = new Date(date);
  const diffDays = Math.floor((now.getTime() - transactionDate.getTime()) / 86_400_000);

  if (Number.isNaN(diffDays)) {
    return 'Inactive';
  }

  return diffDays <= 45 ? 'Active' : 'Inactive';
}

export default function WorkspaceTransactionsView({
  rows,
  rowCount,
  loading,
  fetching,
  onOpenDetails,
}: WorkspaceTransactionsViewProps) {
  const { t } = useLocalization();
  const filters = useTransactionStore((state) => state.filters);
  const setSearchTerm = useTransactionStore((state) => state.setSearchTerm);
  const setPagination = useTransactionStore((state) => state.setPagination);
  const setSorting = useTransactionStore((state) => state.setSorting);
  const [statusFilter, setStatusFilter] = useState<WorkspaceStatusFilter>('all');
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLElement | null>(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState<HTMLElement | null>(null);

  const displayedRows = useMemo(() => {
    if (statusFilter === 'all') {
      return rows;
    }

    return rows.filter((row) => getRowStatus(row.date).toLowerCase() === statusFilter);
  }, [rows, statusFilter]);

  const activeCount = displayedRows.filter((row) => getRowStatus(row.date) === 'Active').length;
  const totalAmount = displayedRows.reduce((sum, row) => sum + row.amount, 0);

  const handleSortMenuOpen = (event: MouseEvent<HTMLElement>) => setSortAnchorEl(event.currentTarget);
  const handleStatusMenuOpen = (event: MouseEvent<HTMLElement>) => setStatusAnchorEl(event.currentTarget);
  const closeMenus = () => {
    setSortAnchorEl(null);
    setStatusAnchorEl(null);
  };

  const sortLabel =
    filters.sorting.field === 'amount'
      ? `Amount ${filters.sorting.direction === 'asc' ? '↑' : '↓'}`
      : filters.sorting.field === 'createdAt'
        ? `Reference ${filters.sorting.direction === 'asc' ? '↑' : '↓'}`
        : `Date ${filters.sorting.direction === 'asc' ? '↑' : '↓'}`;

  const statusLabel =
    statusFilter === 'all'
      ? `${t('workspace.status')} All`
      : statusFilter === 'active'
        ? `${t('workspace.status')} Active`
        : `${t('workspace.status')} Inactive`;

  const workspaceControls = [
    { label: sortLabel, onClick: handleSortMenuOpen },
    {
      label: filters.sorting.field === 'createdAt' ? 'Reference Sorted' : 'Reference',
      onClick: () =>
        setSorting('createdAt', filters.sorting.field === 'createdAt' && filters.sorting.direction === 'asc' ? 'desc' : 'asc'),
    },
    {
      label: filters.sorting.field === 'amount' ? `Amount ${filters.sorting.direction === 'asc' ? '↑' : '↓'}` : 'Amount',
      onClick: () =>
        setSorting('amount', filters.sorting.field === 'amount' && filters.sorting.direction === 'asc' ? 'desc' : 'asc'),
    },
    { label: statusLabel, onClick: handleStatusMenuOpen },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, md: 2.5 },
        borderRadius: 4,
        background:
          'radial-gradient(circle at top left, rgba(180,131,87,0.12) 0%, transparent 24%), linear-gradient(180deg, #f6f4ee 0%, #efede7 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '250px 1fr' },
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${alpha('#111827', 0.06)}`,
          minHeight: 620,
          backgroundColor: '#fbfbfa',
          boxShadow: '0 22px 48px rgba(17, 24, 39, 0.08)',
        }}
      >
        <Box
          sx={{
            p: 2.25,
            borderRight: { md: `1px solid ${alpha('#111827', 0.08)}` },
            borderBottom: { xs: `1px solid ${alpha('#111827', 0.08)}`, md: 'none' },
            background: 'linear-gradient(180deg, #fbfbfb 0%, #f3f3f1 100%)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 38, md: 52 }, fontWeight: 500, lineHeight: 1.02, mb: 3.5 }}
          >
            {t('workspace.company')}
          </Typography>
          <Box
            sx={{
              px: 1.7,
              py: 1.1,
              borderRadius: 999,
              backgroundColor: '#a28757',
              color: 'common.white',
              fontWeight: 700,
              fontSize: 14,
              width: '100%',
              boxShadow: '0 10px 24px rgba(162, 135, 87, 0.2)',
            }}
          >
            {t('workspace.transactions')}
          </Box>

          <Stack spacing={0.75} sx={{ mt: 'auto', pt: 3, color: '#6b7280' }}>
            <Typography variant="caption" sx={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Workspace Mode
            </Typography>
            <Typography variant="body2">
              Compact operator view tuned for fast scanning, direct actions, and cleaner table focus.
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ backgroundColor: '#ffffff' }}>
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
            sx={{
              p: { xs: 1.5, md: 2 },
              borderBottom: `1px solid ${alpha('#111827', 0.08)}`,
              backgroundColor: alpha('#f8f8f7', 0.85),
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} alignItems={{ sm: 'center' }}>
              <TextField
                size="small"
                placeholder={t('workspace.search')}
                value={filters.searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{
                  width: { xs: '100%', sm: 310 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 999,
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.8), inset 0 1px 2px rgba(17,24,39,0.02)',
                  },
                }}
              />
              <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap">
                {workspaceControls.map((item) => (
                  <ButtonBase
                    key={item.label}
                    onClick={item.onClick}
                    sx={{
                      px: 1.1,
                      py: 0.55,
                      borderRadius: 999,
                      border: `1px solid ${alpha('#111827', 0.08)}`,
                      color: 'text.secondary',
                      backgroundColor: '#fff',
                      '&:hover': {
                        backgroundColor: alpha('#111827', 0.03),
                      },
                    }}
                  >
                    <Typography variant="caption">{item.label} ▼</Typography>
                  </ButtonBase>
                ))}
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              {fetching && !loading ? (
                <Typography variant="caption" color="text.secondary">
                  {t('workspace.updating')}
                </Typography>
              ) : null}
              <Button
                component={Link}
                href="/transactions/new"
                variant="outlined"
                color="inherit"
                sx={{
                  borderRadius: 999,
                  px: 2.4,
                  py: 0.8,
                  borderColor: alpha('#111827', 0.5),
                  backgroundColor: '#fff',
                  '&:hover': {
                    borderColor: '#111827',
                    backgroundColor: '#fafafa',
                  },
                }}
              >
                {t('workspace.newTransaction')}
              </Button>
            </Stack>
          </Stack>

          {loading ? (
            <Stack sx={{ minHeight: 320, p: 2 }} spacing={1.25}>
              <Stack direction="row" spacing={2}>
                <Skeleton variant="rounded" width={26} height={26} />
                <Skeleton variant="rounded" width="18%" height={26} />
                <Skeleton variant="rounded" width="22%" height={26} />
                <Skeleton variant="rounded" width="20%" height={26} />
                <Skeleton variant="rounded" width="18%" height={26} sx={{ ml: 'auto' }} />
              </Stack>
              {Array.from({ length: 5 }).map((_, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="rounded" width={26} height={26} />
                  <Skeleton variant="text" width="18%" height={34} />
                  <Skeleton variant="text" width="20%" height={34} />
                  <Skeleton variant="text" width="19%" height={34} />
                  <Skeleton variant="text" width="16%" height={34} sx={{ ml: 'auto' }} />
                </Stack>
              ))}
              <Stack alignItems="center" sx={{ pt: 1 }}>
                <CircularProgress size={20} />
              </Stack>
            </Stack>
          ) : (
            <>
              <Table
                size="small"
                sx={{
                  minWidth: 680,
                  tableLayout: 'fixed',
                  '& .MuiTableCell-head': {
                    backgroundColor: '#f0f1f4',
                    color: '#4b5563',
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha('#111827', 0.08)}`,
                    py: 1.25,
                  },
                  '& .MuiTableCell-root': {
                    borderColor: alpha('#111827', 0.08),
                    py: 1.5,
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{t('workspace.date')}</TableCell>
                    <TableCell>{t('workspace.reference')}</TableCell>
                    <TableCell>Counterparty</TableCell>
                    <TableCell align="right">{t('workspace.amount')}</TableCell>
                    <TableCell>{t('workspace.status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows.map((row) => {
                    const status = getRowStatus(row.date);
                    return (
                      <TableRow
                        key={row.id}
                        hover
                        onClick={() => onOpenDetails(row.id)}
                        sx={{
                          cursor: 'pointer',
                          transition: 'background-color 120ms ease',
                          '&:hover': {
                            backgroundColor: alpha('#14532d', 0.035),
                          },
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                          <Checkbox size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {formatDate(row.date)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500} sx={{ letterSpacing: '0.03em' }}>
                            {row.id.slice(0, 8).toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{row.category?.name || 'General'}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={500}>
                            {formatCurrency(row.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={status}
                            size="small"
                            color={status === 'Active' ? 'success' : 'default'}
                            variant="filled"
                            sx={{
                              bgcolor: status === 'Active' ? alpha('#10b981', 0.2) : alpha('#9ca3af', 0.16),
                              color: status === 'Active' ? '#047857' : '#6b7280',
                              borderRadius: 4,
                              fontWeight: 700,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {displayedRows.length === 0 ? (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  sx={{ p: 5, borderTop: `1px solid ${alpha('#111827', 0.08)}`, minHeight: 220 }}
                >
                  <Typography variant="h6">{t('workspace.noTransactions')}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, textAlign: 'center' }}>
                    {t('workspace.noTransactionsHelp')}
                  </Typography>
                  <Button variant="text" color="inherit" onClick={() => setSearchTerm('')}>
                    {t('workspace.clearSearch')}
                  </Button>
                </Stack>
              ) : (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                      gap: 1,
                      p: 1.5,
                      borderTop: `1px solid ${alpha('#111827', 0.08)}`,
                      backgroundColor: alpha('#111827', 0.018),
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {t('workspace.visibleRows')}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {t('workspace.showing')} {displayedRows.length} / {rowCount} {t('workspace.transactions')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {t('workspace.activeStatus')}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {activeCount} {t('workspace.currentlyActive')}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {t('workspace.visibleAmount')}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(totalAmount)}
                      </Typography>
                    </Box>
                  </Box>
                  <TablePagination
                    component="div"
                    count={rowCount}
                    page={filters.pagination.page}
                    onPageChange={(_event, nextPage) => setPagination(nextPage, filters.pagination.pageSize)}
                    rowsPerPage={filters.pagination.pageSize}
                    onRowsPerPageChange={(event) =>
                      setPagination(0, Number(event.target.value))
                    }
                    rowsPerPageOptions={[10, 20, 50]}
                    sx={{
                      borderTop: `1px solid ${alpha('#111827', 0.08)}`,
                      backgroundColor: '#fff',
                      '& .MuiTablePagination-toolbar': {
                        px: 2,
                      },
                    }}
                  />
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={closeMenus}>
        <MenuItem
          onClick={() => {
            setSorting('date', 'desc');
            closeMenus();
          }}
        >
          {t('workspace.dateNewest')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSorting('date', 'asc');
            closeMenus();
          }}
        >
          {t('workspace.dateOldest')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSorting('createdAt', 'desc');
            closeMenus();
          }}
        >
          {t('workspace.referenceNewest')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSorting('amount', 'desc');
            closeMenus();
          }}
        >
          {t('workspace.amountHighLow')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSorting('amount', 'asc');
            closeMenus();
          }}
        >
          {t('workspace.amountLowHigh')}
        </MenuItem>
      </Menu>

      <Menu anchorEl={statusAnchorEl} open={Boolean(statusAnchorEl)} onClose={closeMenus}>
        <MenuItem
          onClick={() => {
            setStatusFilter('all');
            closeMenus();
          }}
        >
          {t('workspace.allStatuses')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter('active');
            closeMenus();
          }}
        >
          {t('workspace.activeOnly')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter('inactive');
            closeMenus();
          }}
        >
          {t('workspace.inactiveOnly')}
        </MenuItem>
      </Menu>
    </Paper>
  );
}
