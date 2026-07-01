import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin credentials are not configured.",
        },
        { status: 500 },
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken(email);

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully.",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
