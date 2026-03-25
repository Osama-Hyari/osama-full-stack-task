import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("expense-tracker-token")?.value;
  console.log("[/api/session] Cookie token:", token ? token.slice(0, 30) + "..." : "none");
  if (!token) {
    console.log("[/api/session] No token found");
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    console.log("[/api/session] Decoded payload:", payload);
    return NextResponse.json({ authenticated: true, email: payload.email }, { status: 200 });
  } catch (e) {
    console.log("[/api/session] JWT decode error:", e);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
