import { NextRequest, NextResponse } from 'next/server';

const backendBaseUrl = process.env.BACKEND_API_URL || 'http://localhost:3000';

function buildBackendUrl(pathname: string, searchParams?: URLSearchParams) {
  const trimmedBase = backendBaseUrl.replace(/\/$/, '');
  const trimmedPath = pathname.replace(/^\//, '');
  const url = new URL(`${trimmedBase}/${trimmedPath}`);

  if (searchParams) {
    searchParams.forEach((value, key) => {
      if (value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  return url;
}

async function parseBody(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return undefined;
  }

  try {
    const text = await request.text();
    if (!text.trim()) {
      return undefined;
    }
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export async function proxyToBackend(
  request: NextRequest,
  pathname: string,
  init?: RequestInit,
) {
  const backendUrl = buildBackendUrl(pathname, request.nextUrl.searchParams);
  const body = init?.body ?? (await parseBody(request));

  const response = await fetch(backendUrl, {
    method: init?.method || request.method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    body: typeof body === 'undefined' ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });

  const text = await response.text();

  return new NextResponse(text, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') || 'application/json',
    },
  });
}
