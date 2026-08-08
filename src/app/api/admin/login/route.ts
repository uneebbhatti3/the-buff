import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  signSession,
  COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 },
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPasswordHash) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD env vars are not set.");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 },
      );
    }

    const emailMatch =
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

    // Support both bcrypt hashes ($2b$/$2a$) and plain-text passwords in .env
    const isBcryptHash = /^\$2[ab]\$/.test(adminPasswordHash);
    const passwordMatch = isBcryptHash
      ? await bcrypt.compare(password, adminPasswordHash)
      : password === adminPasswordHash;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await signSession();

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      ...sessionCookieOptions(),
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
