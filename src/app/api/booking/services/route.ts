import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/booking/services
 *
 * Returns all active services available for booking.
 */
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        durationMinutes: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        status: 200,
        services,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Fetch services error:", error);

    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Unable to fetch services.",
      },
      {
        status: 500,
      },
    );
  }
}
