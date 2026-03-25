import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/backend-api';

export async function POST(request: NextRequest) {
  return proxyToBackend(request, '/transactions/generate-dummy');
}
