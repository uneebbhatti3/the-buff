import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const LOGIN_URL = "/login";
const ADMIN_PREFIX = "/admin";

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET ?? "");
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) return false;

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If already authenticated, redirect away from the login page
  if (pathname === LOGIN_URL) {
    if (await isAuthenticated(request)) {
      return NextResponse.redirect(new URL(ADMIN_PREFIX, request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (await isAuthenticated(request)) {
      return NextResponse.next();
    }

    // Clear any stale/invalid cookie and redirect to login
    const response = NextResponse.redirect(new URL(LOGIN_URL, request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
