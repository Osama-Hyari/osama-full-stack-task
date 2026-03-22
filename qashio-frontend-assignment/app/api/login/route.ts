import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE = "http://72.62.48.101:3000";
const LOGIN_PATH = "/auth/login";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendRes = await fetch(`${BACKEND_BASE}${LOGIN_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("Login proxy response status:", backendRes.status);
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    return NextResponse.json({ error: "Login proxy error" }, { status: 500 });
  }
}
