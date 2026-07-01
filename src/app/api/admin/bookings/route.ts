import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!verifyAdminSessionToken(sessionToken)) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select(
      `
      id,
      customer_name,
      phone,
      vehicle_name,
      service_type,
      notes,
      booking_date,
      start_time,
      end_time,
      status,
      created_at
    `,
    )
    .order("booking_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}
