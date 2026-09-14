// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/src/constants/auth";
import { parseAuthToken } from "@/lib/auth/jwt";
import { isStaff } from "@/lib/auth/roles";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected pages — require a valid auth token
  if (pathname.startsWith("/orders") || pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const signInUrl = new URL("/sign-in", request.url);

    if (!token) {
      return NextResponse.redirect(signInUrl);
    }

    let userDto;
    try {
      userDto = await parseAuthToken(token);
    } catch {
      return NextResponse.redirect(signInUrl);
    }

    if (pathname.startsWith("/dashboard") && !isStaff(userDto.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/orders/:path*", "/dashboard/:path*"],
};
