import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, '/transactions/summary/report');
}
