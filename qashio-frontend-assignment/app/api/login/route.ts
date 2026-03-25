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

    // Log if backend returns 201 (undocumented)
    if (backendRes.status === 201) {
      console.warn(
        "Received 201 Created from backend. This status is undocumented for login.",
      );
    }

    // If login is successful and a token is present, set it as HttpOnly, Secure cookie
    if (backendRes.status === 201 && data.token) {
      const response = NextResponse.json(
        {
          ...data, // Keep token in response for frontend state
        },
        { status: 200 }, // Always return 200 to frontend
      );

      response.cookies.set("expense-tracker-token", data.token, {
        httpOnly: true,
        secure: false, // Force false for local dev (non-HTTPS)
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    // Otherwise, just proxy the response
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    return NextResponse.json({ error: "Login proxy error" }, { status: 500 });
  }
}
