import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/backend-api';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, '/categories');
}

export async function POST(request: NextRequest) {
  return proxyToBackend(request, '/categories');
}
