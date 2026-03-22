'use client';

import { create } from 'zustand';
import { TransactionFilters } from '@/app/types';

const initialFilters: TransactionFilters = {
  searchTerm: '',
  type: 'all',
  categoryId: '',
  dateRange: {
    startDate: null,
    endDate: null,
  },
  amountRange: {
    min: '',
    max: '',
  },
  pagination: {
    page: 0,
    pageSize: 10,
  },
  sorting: {
    field: 'date',
    direction: 'desc',
  },
};

interface TransactionState {
  filters: TransactionFilters;
  setType: (type: TransactionFilters['type']) => void;
  setCategoryId: (categoryId: string) => void;
  setDateRange: (startDate: Date | null, endDate: Date | null) => void;
  setSearchTerm: (term: string) => void;
  setAmountRange: (key: 'min' | 'max', value: string) => void;
  setPagination: (page: number, pageSize: number) => void;
  setSorting: (
    field: TransactionFilters['sorting']['field'],
    direction: TransactionFilters['sorting']['direction'],
  ) => void;
  resetFilters: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  filters: initialFilters,

  setType: (type) =>
    set((state) => ({
      filters: {
        ...state.filters,
        type,
        pagination: {
          ...state.filters.pagination,
          page: 0,
        },
      },
    })),

  setCategoryId: (categoryId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categoryId,
        pagination: {
          ...state.filters.pagination,
          page: 0,
        },
      },
    })),
  
  setDateRange: (startDate, endDate) => 
    set((state) => ({
      filters: {
        ...state.filters,
        dateRange: { startDate, endDate },
        pagination: {
          ...state.filters.pagination,
          page: 0,
        },
      },
    })),
    
  setSearchTerm: (searchTerm) => 
    set((state) => ({
      filters: {
        ...state.filters,
        searchTerm,
      },
    })),

  setAmountRange: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        amountRange: {
          ...state.filters.amountRange,
          [key]: value,
        },
        pagination: {
          ...state.filters.pagination,
          page: 0,
        },
      },
    })),

  setPagination: (page, pageSize) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pagination: {
          page,
          pageSize,
        },
      },
    })),

  setSorting: (field, direction) =>
    set((state) => ({
      filters: {
        ...state.filters,
        sorting: {
          field,
          direction,
        },
      },
    })),
    
  resetFilters: () => set({ filters: initialFilters }),
})); 

export const transactionFilterDefaults = initialFilters;
