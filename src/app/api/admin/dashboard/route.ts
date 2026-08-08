import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BookingStatus } from "../../../../../generated/prisma/enums";
import {
  getTodayInPakistan,
  toDateOnly,
} from "@/features/booking/utils/booking-utils";

export async function GET() {
  try {
    const todayStr = getTodayInPakistan();
    const todayDate = toDateOnly(todayStr);

    const [
      todayBookingsCount,
      pendingCount,
      inProgressCount,
      todayRevenueAgg,
      todaySchedule,
      pendingBookings,
      recentBookings,
    ] = await Promise.all([
      prisma.booking.count({
        where: {
          bookingDate: todayDate,
          bookingStatus: { not: BookingStatus.CANCELLED },
        },
      }),
      prisma.booking.count({
        where: { bookingStatus: BookingStatus.PENDING },
      }),
      prisma.booking.count({
        where: { bookingStatus: BookingStatus.IN_PROGRESS },
      }),
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: {
          bookingStatus: {
            in: [
              BookingStatus.CONFIRMED,
              BookingStatus.IN_PROGRESS,
              BookingStatus.COMPLETED,
            ],
          },
        },
      }),
      prisma.booking.findMany({
        where: {
          bookingDate: todayDate,
          bookingStatus: {
            in: [BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS],
          },
        },
        include: {
          bookingServices: { select: { serviceName: true } },
        },
        orderBy: { startAt: "asc" },
      }),
      prisma.booking.findMany({
        where: { bookingStatus: BookingStatus.PENDING },
        include: {
          bookingServices: { select: { serviceName: true } },
        },
        orderBy: { createdAt: "asc" },
        take: 8,
      }),
      prisma.booking.findMany({
        include: {
          bookingServices: { select: { serviceName: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        todayBookings: todayBookingsCount,
        pending: pendingCount,
        inProgress: inProgressCount,
        todayRevenue: todayRevenueAgg._sum.totalPrice ?? 0,
      },
      todaySchedule: todaySchedule.map((b) => ({
        id: b.id,
        fullName: b.fullName,
        phone: b.phone,
        vehicle: b.vehicle,
        startAt: b.startAt,
        endAt: b.endAt,
        bookingStatus: b.bookingStatus,
        durationMinutes: b.durationMinutes,
        totalPrice: b.totalPrice,
        services: b.bookingServices.map((s) => s.serviceName),
      })),
      pendingBookings: pendingBookings.map((b) => ({
        id: b.id,
        fullName: b.fullName,
        phone: b.phone,
        vehicle: b.vehicle,
        bookingDate: b.bookingDate.toISOString(),
        startAt: b.startAt,
        endAt: b.endAt,
        services: b.bookingServices.map((s) => s.serviceName),
        createdAt: b.createdAt.toISOString(),
      })),
      recentBookings: recentBookings.map((b) => ({
        id: b.id,
        fullName: b.fullName,
        vehicle: b.vehicle,
        bookingDate: b.bookingDate.toISOString(),
        startAt: b.startAt,
        bookingStatus: b.bookingStatus,
        totalPrice: b.totalPrice,
        services: b.bookingServices.map((s) => s.serviceName),
      })),
    });
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard data." },
      { status: 500 },
    );
  }
}
