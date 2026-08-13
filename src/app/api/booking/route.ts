import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import {
  BookingAvailabilitySchema,
  CreateBookingSchema,
} from "@/features/booking/schemas/booking-schema";

import { addMinutes, minutesToTime, toDateOnly, toDateTime } from "@/features/booking/utils/booking-utils";
import { isDateInPast, isTimeConflict, calculateAvailableSlots } from "@/features/booking/utils/booking-slots";
import { getBookingRules, getActiveServices } from "@/features/booking/utils/booking-queries";
import { sendBookingNotifications } from "@/features/booking/utils/booking-notifications";

import { BookingStatus } from "../../../../generated/prisma/enums";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date") ?? "";
    const servicesParam = request.nextUrl.searchParams.get("services") ?? "";
    const services = servicesParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const result = BookingAvailabilitySchema.safeParse({ date, services });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid availability request.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = result.data;

    if (isDateInPast(data.date)) {
      return NextResponse.json({
        success: true,
        status: 200,
        date: data.date,
        durationMinutes: 0,
        totalPrice: 0,
        slots: [],
      });
    }

    const rules = await getBookingRules(data.date);
    const { durationMinutes, totalPrice } = await getActiveServices(
      data.services,
    );

    if (!rules.isOpen) {
      return NextResponse.json({
        success: true,
        status: 200,
        date: data.date,
        durationMinutes,
        totalPrice,
        slots: [],
      });
    }

    const bookingDate = toDateOnly(data.date);

    const existingBookings = await prisma.booking.findMany({
      where: {
        bookingDate,
        bookingStatus: { not: BookingStatus.CANCELLED },
      },
      select: { startAt: true, endAt: true },
    });

    const slots = calculateAvailableSlots({
      date: data.date,
      openingMinutes: rules.openingMinutes,
      closingMinutes: rules.closingMinutes,
      slotIntervalMinutes: rules.slotIntervalMinutes,
      bufferMinutes: rules.bufferMinutes,
      minimumNoticeMinutes: rules.minimumNoticeMinutes,
      durationMinutes,
      existingBookings,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      date: data.date,
      durationMinutes,
      totalPrice,
      slots,
    });
  } catch (error) {
    return handleBookingError(error, "Booking availability error:");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const result = CreateBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid booking data.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = result.data;

    if (isDateInPast(data.bookingDate)) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Booking date cannot be in the past.",
        },
        { status: 400 },
      );
    }

    const rules = await getBookingRules(data.bookingDate);

    if (!rules.isOpen) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "The studio is closed on the selected date.",
        },
        { status: 400 },
      );
    }

    const { services, durationMinutes, totalPrice } = await getActiveServices(
      data.services,
    );

    const startAt = toDateTime(data.bookingDate, data.startTime);
    const endAt = addMinutes(startAt, durationMinutes);
    const closingTime = toDateTime(
      data.bookingDate,
      minutesToTime(rules.closingMinutes),
    );

    if (endAt > closingTime) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message:
            "The selected services cannot be completed before closing time.",
        },
        { status: 400 },
      );
    }

    const earliestAllowedStart = new Date(
      Date.now() + rules.minimumNoticeMinutes * 60_000,
    );

    if (startAt < earliestAllowedStart) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "This appointment is too soon. Please select a later time.",
        },
        { status: 400 },
      );
    }

    const bookingDate = toDateOnly(data.bookingDate);

    const booking = await prisma.$transaction(
      async (tx) => {
        const existingBookings = await tx.booking.findMany({
          where: {
            bookingDate,
            bookingStatus: { not: BookingStatus.CANCELLED },
          },
          select: { startAt: true, endAt: true },
        });

        const hasConflict = existingBookings.some((b) =>
          isTimeConflict(startAt, endAt, b, rules.bufferMinutes),
        );

        if (hasConflict) throw new Error("BOOKING_TIME_UNAVAILABLE");

        return tx.booking.create({
          data: {
            fullName: data.fullName,
            phone: data.phone,
            vehicle: data.vehicle,
            bookingDate,
            startAt,
            endAt,
            durationMinutes,
            totalPrice,
            notes: data.notes,
            bookingServices: {
              create: services.map((s) => ({
                serviceId: s.id,
                serviceName: s.name,
                price: s.price,
                durationMinutes: s.durationMinutes,
              })),
            },
          },
          include: { bookingServices: true },
        });
      },
      { isolationLevel: "Serializable" },
    );

    void sendBookingNotifications({
      fullName: data.fullName,
      phone: data.phone,
      vehicle: data.vehicle,
      services: booking.bookingServices.map((s) => ({
        name: s.serviceName,
        price: s.price,
      })),
      startAt: booking.startAt,
      endAt: booking.endAt,
      durationMinutes: booking.durationMinutes,
      totalPrice: booking.totalPrice,
      notes: booking.notes,
    });

    return NextResponse.json(
      {
        success: true,
        status: 201,
        message: "Booking request submitted successfully.",
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleBookingError(error, "Create booking error:");
  }
}

function handleBookingError(error: unknown, logPrefix: string) {
  if (error instanceof Error) {
    switch (error.message) {
      case "BOOKING_TIME_UNAVAILABLE":
        return NextResponse.json(
          {
            success: false,
            status: 409,
            message:
              "The selected appointment time is no longer available. Please select another time.",
          },
          { status: 409 },
        );

      case "SERVICE_UNAVAILABLE":
        return NextResponse.json(
          {
            success: false,
            status: 400,
            message: "One or more selected services are unavailable.",
            missingIds:
              (error as Error & { missingIds?: string[] }).missingIds ?? [],
          },
          { status: 400 },
        );

      case "BOOKING_SETTINGS_NOT_CONFIGURED":
        return NextResponse.json(
          {
            success: false,
            status: 500,
            message: "Booking settings are not configured.",
          },
          { status: 500 },
        );

      case "INVALID_BOOKING_HOURS":
        return NextResponse.json(
          {
            success: false,
            status: 500,
            message: "The configured booking hours are invalid.",
          },
          { status: 500 },
        );
    }
  }

  console.error(logPrefix, error);

  return NextResponse.json(
    { success: false, status: 500, message: "An unexpected error occurred." },
    { status: 500 },
  );
}
