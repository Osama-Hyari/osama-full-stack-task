export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: TransactionType;
  categoryId: string;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface Budget {
  id: string;
  amount: number;
  categoryId: string;
  category?: Category;
  periodStart: string;
  periodEnd: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BudgetUsage {
  budgetId: string;
  spent: number;
  remaining: number;
  percentageUsed: number;
  overBudget: boolean;
}

export interface SummaryReport {
  totalIncome: number;
  totalExpense: number;
  net: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TransactionQueryParams {
  page: number;
  limit: number;
  sortBy?: 'date' | 'amount' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
  type?: TransactionType | 'all';
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: string;
  maxAmount?: string;
}

export interface TransactionFilters {
  searchTerm: string;
  type: TransactionType | 'all';
  categoryId: string;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  amountRange: {
    min: string;
    max: string;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sorting: {
    field: 'date' | 'amount' | 'createdAt';
    direction: 'asc' | 'desc';
  };
}

export interface TransactionFormValues {
  amount: string;
  categoryId: string;
  date: Date | null;
  type: TransactionType;
}

export interface TransactionPayload {
  amount: number;
  categoryId: string;
  date: string;
  type: TransactionType;
}

export interface CategoryPayload {
  name: string;
}

export interface BudgetPayload {
  amount: number;
  categoryId: string;
  periodStart: string;
  periodEnd: string;
}

export interface ApiErrorPayload {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}