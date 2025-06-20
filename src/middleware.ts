// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  const apiKey = request.headers.get("x-api-key");
  const validApiKey = process.env.API_SECRET_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing API key" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
