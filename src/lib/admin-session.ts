import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "admin_session";
const EXPIRY = "7d";

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");

  return new TextEncoder().encode(secret);
}

export async function signSession(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}
