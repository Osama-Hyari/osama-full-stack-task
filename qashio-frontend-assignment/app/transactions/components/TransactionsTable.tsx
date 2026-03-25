'use client';

import { useEffect, useState, useRef } from 'react';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { Transaction } from '@/app/types';
import { useTransactionStore } from '@/app/hooks/useTransactionStore';
import { capitalize, formatCurrency, formatDate, getTypeTone } from '@/lib/formatters';
import { useLocalization } from '@/lib/localization-context';

interface TransactionsTableProps {
  rows: Transaction[];
  rowCount: number;
  page?: number;
  pageSize?: number;
  loading: boolean;
  fetching: boolean;
  onOpenDetails: (id: string) => void;
}

export default function TransactionsTable({
  rows,
  rowCount,
  page,
  pageSize,
  loading,
  fetching,
  onOpenDetails,
}: TransactionsTableProps) {
  console.log('[DEBUG] TransactionsTable pagination:', { rowCount, page, pageSize });
  const { t } = useLocalization();
  const [isMounted, setIsMounted] = useState(false);
  const filters = useTransactionStore((state) => state.filters);
  const setPagination = useTransactionStore((state) => state.setPagination);
  const setSorting = useTransactionStore((state) => state.setSorting);
  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    // If any filter except pagination changes, reset to first page
    const prev = prevFiltersRef.current;
    if (
      prev.type !== filters.type ||
      prev.categoryId !== filters.categoryId ||
      prev.dateRange.startDate !== filters.dateRange.startDate ||
      prev.dateRange.endDate !== filters.dateRange.endDate ||
      prev.amountRange.min !== filters.amountRange.min ||
      prev.amountRange.max !== filters.amountRange.max ||
      prev.searchTerm !== filters.searchTerm
    ) {
      setPagination(0, filters.pagination.pageSize);
    }
    prevFiltersRef.current = filters;
  }, [filters, setPagination]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const columns: GridColDef<Transaction>[] = [
    {
      field: 'date',
      headerName: t('table.date'),
      flex: 1,
      minWidth: 130,
      valueFormatter: (value) => formatDate(String(value)),
    },
    {
      field: 'categoryId',
      headerName: t('table.category'),
      flex: 1.2,
      minWidth: 170,
      sortable: false,
      valueGetter: (_value, row) => row.category?.name || row.categoryId,
    },
    {
      field: 'type',
      headerName: t('table.type'),
      flex: 0.9,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={capitalize(params.row.type)}
          color={getTypeTone(params.row.type)}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'amount',
      headerName: t('table.amount'),
      flex: 1,
      minWidth: 140,
      valueFormatter: (value) => formatCurrency(Number(value)),
    },
    {
      field: 'createdAt',
      headerName: t('table.created'),
      minWidth: 140,
      flex: 1,
      valueFormatter: (value) => (value ? String(value) : 'N/A'),
    },
  ];

  const paginationModel: GridPaginationModel = {
    page: typeof page === 'number' ? page : filters.pagination.page,
    pageSize: typeof pageSize === 'number' ? pageSize : filters.pagination.pageSize,
  };
  const sortModel: GridSortModel = [
    {
      field: filters.sorting.field,
      sort: filters.sorting.direction,
    },
  ];

  return (
    <Paper elevation={0} sx={{ p: 1.5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1.5} sx={{ px: 1.5, py: 1 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6">{t('table.title')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('table.subtitle')}
          </Typography>
        </Stack>
        {fetching && !loading ? (
          <Typography variant="body2" color="text.secondary">
            {t('table.refreshing')}
          </Typography>
        ) : null}
      </Stack>

      {isMounted ? (
        <DataGrid
          autoHeight
          disableRowSelectionOnClick
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          paginationMode="server"
          sortingMode="server"
          pageSizeOptions={[10, 20, 50]}
          paginationModel={paginationModel}
          sortModel={sortModel}
          onPaginationModelChange={(model) => {
            console.log('[DEBUG] setPagination called with:', model.page, model.pageSize);
            setPagination(model.page, model.pageSize);
          }}
          onSortModelChange={(model) => {
            if (!model[0]?.field || !model[0]?.sort) {
              setSorting('date', 'desc');
              return;
            }

            setSorting(model[0].field as 'date' | 'amount' | 'createdAt', model[0].sort);
          }}
          onRowClick={(params) => onOpenDetails(params.row.id)}
          sx={{
            '& .MuiDataGrid-cell': {
              borderColor: 'rgba(20,83,45,0.08)',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}
        />
      ) : null}
    </Paper>
  );
}
