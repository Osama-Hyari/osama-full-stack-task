import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  // Forward query parameters to backend
  const search = request.nextUrl.search;
  const backendPath = `/reports/big-transactions/job${search}`;
  return proxyToBackend(request, backendPath);
}
