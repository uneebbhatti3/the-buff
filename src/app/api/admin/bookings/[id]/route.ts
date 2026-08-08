import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BookingStatus } from "../../../../../../generated/prisma/enums";

const VALID_STATUSES = Object.values(BookingStatus);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("status" in body) ||
      typeof (body as Record<string, unknown>).status !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    const status = (body as Record<string, string>).status;

    if (!VALID_STATUSES.includes(status as BookingStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid booking status." },
        { status: 400 },
      );
    }

    const existing = await prisma.booking.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 },
      );
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { bookingStatus: status as BookingStatus },
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
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Admin booking update error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update booking." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.booking.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 },
      );
    }

    await prisma.booking.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Admin booking delete error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete booking." },
      { status: 500 },
    );
  }
}
