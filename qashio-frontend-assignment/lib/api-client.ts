import {
  Budget,
  BudgetPayload,
  BudgetUsage,
  Category,
  CategoryPayload,
  PaginatedResponse,
  SummaryReport,
  Transaction,
  TransactionPayload,
  TransactionQueryParams,
} from "@/app/types";
import { getToken } from "./token-utils";

function toQueryString(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== "undefined" && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

function normalizePaginatedTransactions(
  payload: any,
  fallbackPage: number,
  fallbackLimit: number,
): PaginatedResponse<Transaction> {
  const meta = payload?.meta || {};
  const data = Array.isArray(payload?.data) ? payload.data : [];
  const total = meta.total ?? payload?.total ?? data.length;
  const page = meta.page ?? payload?.page ?? fallbackPage;
  const limit = meta.limit ?? payload?.limit ?? fallbackLimit;
  const totalPages = meta.totalPages ?? payload?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(limit, 1)));

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

function normalizeCollection<T>(payload: any): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

function resolveRequestInput(input: string): string {
  if (typeof window === "undefined") {
    return input;
  }

  const currentOrigin = window.location.origin;
  const resolved = new URL(input, currentOrigin);

  // Keep frontend API calls same-origin even if an absolute localhost URL leaks in.
  if (resolved.pathname.startsWith("/api/")) {
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  }

  return resolved.toString();
}

/**
 * request<T>(input, init, token)
 * - If token is provided, use it for Authorization header (SSR or custom fetch).
 * - If not, on client, use token from localStorage if available.
 * - On 401, optionally handle redirect in caller.
 */
async function request<T>(
  input: string,
  init?: RequestInit,
  token?: string,
): Promise<T> {
  let authToken = token || getToken();
  const resolvedUrl = resolveRequestInput(input);
  console.log('[api-client] Request:', {
    url: resolvedUrl,
    method: init?.method || 'GET',
    hasToken: !!authToken,
    tokenPreview: authToken ? authToken.slice(0, 30) + '...' : null,
    headers: init?.headers,
    body: init?.body,
  });

  const response = await fetch(resolvedUrl, {
    ...init,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...init?.headers,
    },
  });

  if (response.status === 401 && typeof window !== "undefined") {
    console.warn('[api-client] 401 Unauthorized, redirecting to /login');
    window.localStorage.removeItem("expense-tracker-auth");
    window.localStorage.removeItem("expense-tracker-token");
    window.location.href = "/login";
    return new Promise(() => {}) as Promise<T>;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = Array.isArray(payload?.message)
      ? payload.message.join(", ")
      : payload?.message || payload?.error || "Request failed";
    console.error('[api-client] Request failed:', message, { url: resolvedUrl, status: response.status });
    throw new Error(message);
  }

  console.log('[api-client] Response:', { url: resolvedUrl, status: response.status, payload });
  return payload as T;
}

export const expenseTrackerApi = {
  getTransactions: async (params: TransactionQueryParams) => {
    const payload = await request<any>(
      `/api/transactions${toQueryString({
        page: params.page,
        limit: params.limit,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        type: params.type && params.type !== "all" ? params.type : undefined,
        categoryId: params.categoryId || undefined,
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
        minAmount: params.minAmount,
        maxAmount: params.maxAmount,
      })}`,
    );

    return normalizePaginatedTransactions(payload, params.page, params.limit);
  },
  getTransaction: (id: string) =>
    request<Transaction>(`/api/transactions/${id}`),
  createTransaction: (payload: TransactionPayload) =>
    request<Transaction>("/api/transactions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getCategories: async () =>
    normalizeCollection<Category>(await request<any>("/api/categories")),
  createCategory: (payload: CategoryPayload) =>
    request<Category>("/api/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getBudgets: async () =>
    normalizeCollection<Budget>(await request<any>("/api/budgets")),
  createBudget: (payload: BudgetPayload) =>
    request<Budget>("/api/budgets", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getBudgetUsage: (id: string) =>
    request<BudgetUsage>(`/api/budgets/${id}/usage`),
  getSummary: async (dateFrom?: string, dateTo?: string) => {
    const payload = await request<any>(
      `/api/transactions/summary/report${toQueryString({ dateFrom, dateTo })}`,
    );

    return {
      totalIncome: payload?.totalIncome ?? payload?.income ?? 0,
      totalExpense: payload?.totalExpense ?? payload?.expense ?? 0,
      net: payload?.net ?? 0,
    };
  },
};
