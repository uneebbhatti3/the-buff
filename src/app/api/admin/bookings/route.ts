import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BookingStatus } from "../../../../../generated/prisma/enums";

const VALID_STATUSES = Object.values(BookingStatus);

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const page = Math.max(1, parseInt(params.get("page") ?? "1") || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(params.get("limit") ?? "20") || 20),
    );
    const statusParam = params.get("status") ?? "";
    const search = params.get("search")?.trim() ?? "";
    const sort = params.get("sort") ?? "date_desc";

    const status =
      statusParam && VALID_STATUSES.includes(statusParam as BookingStatus)
        ? (statusParam as BookingStatus)
        : undefined;

    const where = {
      ...(status && { bookingStatus: status }),
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search } },
          { vehicle: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const orderBy =
      sort === "date_asc"
        ? [{ bookingDate: "asc" as const }, { startAt: "asc" as const }]
        : [{ bookingDate: "desc" as const }, { startAt: "desc" as const }];

    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          bookingServices: {
            select: {
              id: true,
              serviceName: true,
              price: true,
              durationMinutes: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      bookings,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Admin bookings fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings." },
      { status: 500 },
    );
  }
}
