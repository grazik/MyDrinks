// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/src/constants/auth";
import { verifyAuthToken } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes — require x-api-key header
  if (pathname.startsWith("/api")) {
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

  // Protected pages — require a valid auth token
  if (pathname.startsWith("/orders")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (token) {
      try {
        await verifyAuthToken(token);
        return NextResponse.next();
      } catch {
        // Token is invalid or expired — fall through to redirect
      }
    }

    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/orders/:path*"],
};
