// lib/token-utils.ts

/**
 * Consistent utility to get the JWT token for API requests.
 * - On the server (API routes, middleware, SSR): reads from cookies param (NextRequest.cookies)
 * - On the client: reads from document.cookie (if not HttpOnly) or localStorage fallback
 *
 * Usage:
 *   import { getToken } from '@/lib/token-utils';
 *   const token = getToken({ cookies });
 */

export function getToken({ cookies }: { cookies?: any } = {}): string | null {
  // Server-side (Next.js API route, middleware)
  if (typeof window === 'undefined' && cookies) {
    // NextRequest.cookies.get returns { value } or undefined
    const cookie = cookies.get?.('expense-tracker-token');
    if (cookie) return typeof cookie === 'string' ? cookie : cookie.value;
    return null;
  }
  // Client-side: try localStorage, then document.cookie (if not HttpOnly)
  if (typeof window !== 'undefined') {
    const local = window.localStorage.getItem('expense-tracker-token');
    if (local) return local;
    // Fallback: try to read from document.cookie (not HttpOnly)
    const match = document.cookie.match(/(?:^|; )expense-tracker-token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
  return null;
}
