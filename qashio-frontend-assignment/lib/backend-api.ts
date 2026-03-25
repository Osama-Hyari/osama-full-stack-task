import { NextRequest, NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_API_URL || "http://localhost:3000";

function buildBackendUrl(pathname: string, searchParams?: URLSearchParams) {
  const trimmedBase = backendBaseUrl.replace(/\/$/, "");
  const trimmedPath = pathname.replace(/^\//, "");
  const url = new URL(`${trimmedBase}/${trimmedPath}`);

  if (searchParams) {
    searchParams.forEach((value, key) => {
      if (value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url;
}

async function parseBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
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

  // Forward the JWT as Authorization header if present
  const tokenObj = request.cookies.get("expense-tracker-token");
  const token = tokenObj?.value;

  if (!token) {
    // Return 401 Unauthorized if token is missing
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("================ PROXY REQUEST ================");
  console.log("Method:", request.method);
  console.log("Frontend URL:", request.url);
  console.log("Backend URL:", backendUrl.toString());
  console.log("Token present:", !!token);
  if (token) {
    console.log("JWT (first 30 chars):", token.slice(0, 30) + "...");
  }
  if (body) {
    console.log("Body:", JSON.stringify(body));
  }
  // Build headers as a plain object to avoid spread issues
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
  };
  if (init?.headers) {
    Object.entries(init.headers as Record<string, string>).forEach(([k, v]) => {
      headers[k] = v;
    });
  }
  headers["Authorization"] = `Bearer ${token}`;
  console.log(
    "Authorization header:",
    headers["Authorization"].slice(0, 40) + "...",
  );
  console.log("===============================================");

  const response = await fetch(backendUrl, {
    method: init?.method || request.method,
    headers,
    body: typeof body === "undefined" ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();

  // Forward all headers from backend response
  const resHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    resHeaders[key] = value;
  });
  // Always set CORS headers for local dev
  resHeaders["Access-Control-Allow-Origin"] = "http://localhost:3000";
  resHeaders["Access-Control-Allow-Credentials"] = "true";
  resHeaders["Access-Control-Allow-Headers"] = "*";
  resHeaders["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";

  return new NextResponse(text, {
    status: response.status,
    headers: resHeaders,
  });
}
