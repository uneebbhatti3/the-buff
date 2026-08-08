import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import {
  BookingAvailabilitySchema,
  CreateBookingSchema,
} from "@/features/booking/schemas/booking-schema";

import {
  addMinutes,
  getTodayInPakistan,
  getWeekday,
  minutesToTime,
  timeToMinutes,
  toDateOnly,
  toDateTime,
  formatSlotLabel,
} from "@/features/booking/utils/booking-utils";

import { BookingStatus } from "../../../../generated/prisma/enums";
import { normalisePakistaniPhone, sendWhatsAppMessage } from "@/lib/wasender";

// const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type ExistingBooking = {
  startAt: Date;
  endAt: Date;
};

type BookingSlot = {
  startTime: string;
  startAt: string;
  endAt: string;
  label: string;
};

function isDateInPast(date: string): boolean {
  return date < getTodayInPakistan();
}

// function getMinimumAllowedDate(): Date {
//   return new Date(Date.now() + 0);
// }

function isTimeConflict(
  candidateStart: Date,
  candidateEnd: Date,
  booking: ExistingBooking,
  bufferMinutes: number,
): boolean {
  const blockedBookingEnd = addMinutes(booking.endAt, bufferMinutes);

  return candidateStart < blockedBookingEnd && candidateEnd > booking.startAt;
}

function calculateAvailableSlots({
  date,
  openingMinutes,
  closingMinutes,
  slotIntervalMinutes,
  bufferMinutes,
  minimumNoticeMinutes,
  durationMinutes,
  existingBookings,
}: {
  date: string;
  openingMinutes: number;
  closingMinutes: number;
  slotIntervalMinutes: number;
  bufferMinutes: number;
  minimumNoticeMinutes: number;
  durationMinutes: number;
  existingBookings: ExistingBooking[];
}): BookingSlot[] {
  const slots: BookingSlot[] = [];

  const closingTime = toDateTime(date, minutesToTime(closingMinutes));

  const earliestAllowedStart = new Date(
    Date.now() + minimumNoticeMinutes * 60_000,
  );

  for (
    let minutes = openingMinutes;
    minutes < closingMinutes;
    minutes += slotIntervalMinutes
  ) {
    const startTime = minutesToTime(minutes);

    const candidateStart = toDateTime(date, startTime);

    if (candidateStart < earliestAllowedStart) {
      continue;
    }

    const candidateEnd = addMinutes(candidateStart, durationMinutes);

    const blockedEnd = addMinutes(candidateEnd, bufferMinutes);

    if (blockedEnd > closingTime) {
      continue;
    }

    const hasConflict = existingBookings.some((booking) =>
      isTimeConflict(candidateStart, blockedEnd, booking, bufferMinutes),
    );

    if (hasConflict) {
      continue;
    }

    slots.push({
      startTime,
      startAt: candidateStart.toISOString(),
      endAt: candidateEnd.toISOString(),
      label: formatSlotLabel(candidateStart, candidateEnd),
    });
  }

  return slots;
}

async function getBookingRules(date: string) {
  const weekday = getWeekday(date);

  const [bookingHours, settings] = await Promise.all([
    prisma.bookingHours.findUnique({
      where: {
        weekday,
      },
    }),

    prisma.bookingSettings.findUnique({
      where: {
        id: "default",
      },
    }),
  ]);

  if (!settings) {
    throw new Error("BOOKING_SETTINGS_NOT_CONFIGURED");
  }

  if (!bookingHours || bookingHours.closed) {
    return {
      isOpen: false as const,
    };
  }

  const openingMinutes = timeToMinutes(bookingHours.open);

  const closingMinutes = timeToMinutes(bookingHours.close);

  if (openingMinutes >= closingMinutes) {
    throw new Error("INVALID_BOOKING_HOURS");
  }

  return {
    isOpen: true as const,
    openingMinutes,
    closingMinutes,
    slotIntervalMinutes: settings.slotIntervalMinutes,
    bufferMinutes: settings.bufferMinutes,
    bookingWindowDays: settings.bookingWindowDays,
    minimumNoticeMinutes: settings.minimumNoticeMinutes,
  };
}

async function getActiveServices(serviceIds: string[]) {
  const uniqueIds = [...new Set(serviceIds)];

  const services = await prisma.service.findMany({
    where: {
      id: {
        in: uniqueIds,
      },
      isActive: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  if (services.length !== uniqueIds.length) {
    const foundIds = new Set(services.map((service) => service.id));

    const missingIds = uniqueIds.filter((id) => !foundIds.has(id));

    const error = new Error("SERVICE_UNAVAILABLE") as Error & {
      missingIds: string[];
    };

    error.missingIds = missingIds;

    throw error;
  }

  const durationMinutes = services.reduce(
    (total, service) => total + service.durationMinutes,
    0,
  );

  const totalPrice = services.reduce(
    (total, service) => total + service.price,
    0,
  );

  return {
    services,
    durationMinutes,
    totalPrice,
  };
}

type BookingNotificationData = {
  fullName: string;
  phone: string;
  vehicle: string;
  serviceNames: string[];
  startAt: Date;
  endAt: Date;
  durationMinutes: number;
  totalPrice: number;
  notes?: string | null;
};

function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK").format(amount);
}

function buildAdminMessage(b: BookingNotificationData): string {
  const slot = formatSlotLabel(b.startAt, b.endAt);

  const date = new Intl.DateTimeFormat("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Karachi",
  }).format(b.startAt);

  const lines = [
    "📋 *New Booking Request*",
    "",
    `👤 *Name:* ${b.fullName}`,
    `📞 *Phone:* ${b.phone}`,
    `🚗 *Vehicle:* ${b.vehicle}`,
    `📅 *Date:* ${date}`,
    `🕐 *Time:* ${slot}`,
    `🛠 *Services:* ${b.serviceNames.join(", ")}`,
    `⏱ *Duration:* ${b.durationMinutes} min`,
    `💰 *Total:* Rs. ${formatPKR(b.totalPrice)}`,
  ];

  if (b.notes) {
    lines.push(`📝 *Notes:* ${b.notes}`);
  }

  return lines.join("\n");
}

function buildUserMessage(b: BookingNotificationData): string {
  const slot = formatSlotLabel(b.startAt, b.endAt);

  const date = new Intl.DateTimeFormat("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Karachi",
  }).format(b.startAt);

  return [
    `Hi ${b.fullName}! 👋`,
    "",
    "Thank you for booking with *The Buff Detailing*. Your request has been received and is pending confirmation.",
    "",
    "📋 *Booking Summary*",
    `📅 *Date:* ${date}`,
    `🕐 *Time:* ${slot}`,
    `🚗 *Vehicle:* ${b.vehicle}`,
    `🛠 *Services:* ${b.serviceNames.join(", ")}`,
    `💰 *Total:* Rs. ${formatPKR(b.totalPrice)}`,
    "",
    "We will contact you shortly to confirm. If you have any questions, feel free to reach out.",
    "",
    "— The Buff Detailing Team",
  ].join("\n");
}

async function sendBookingNotifications(
  b: BookingNotificationData,
): Promise<void> {
  const adminNumber = process.env.ADMIN_WHATSAPP;

  const userNumber = normalisePakistaniPhone(b.phone);

  const tasks: Promise<void>[] = [];

  if (adminNumber) {
    tasks.push(
      sendWhatsAppMessage(adminNumber, buildAdminMessage(b)).catch((err) =>
        console.error("Failed to send admin WhatsApp notification:", err),
      ),
    );
  }

  tasks.push(
    sendWhatsAppMessage(userNumber, buildUserMessage(b)).catch((err) =>
      console.error("Failed to send user WhatsApp notification:", err),
    ),
  );

  await Promise.all(tasks);
}

/**
 * GET /api/booking
 *
 * Example:
 *
 * /api/booking?date=2026-08-30&services=id1,id2
 *
 * Returns available appointment times.
 */
export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date") ?? "";

    const servicesParam = request.nextUrl.searchParams.get("services") ?? "";

    const services = servicesParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const result = BookingAvailabilitySchema.safeParse({
      date,
      services,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid availability request.",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
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
        bookingStatus: {
          not: BookingStatus.CANCELLED,
        },
      },

      select: {
        startAt: true,
        endAt: true,
      },
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
    if (error instanceof Error && error.message === "SERVICE_UNAVAILABLE") {
      const missingIds =
        (
          error as Error & {
            missingIds?: string[];
          }
        ).missingIds ?? [];

      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "One or more selected services are unavailable.",
          missingIds,
        },
        {
          status: 400,
        },
      );
    }

    if (
      error instanceof Error &&
      error.message === "BOOKING_SETTINGS_NOT_CONFIGURED"
    ) {
      return NextResponse.json(
        {
          success: false,
          status: 500,
          message: "Booking settings are not configured.",
        },
        {
          status: 500,
        },
      );
    }

    if (error instanceof Error && error.message === "INVALID_BOOKING_HOURS") {
      return NextResponse.json(
        {
          success: false,
          status: 500,
          message: "The configured booking hours are invalid.",
        },
        {
          status: 500,
        },
      );
    }

    console.error("Booking availability error:", error);

    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Unable to check booking availability.",
      },
      {
        status: 500,
      },
    );
  }
}

/**
 * POST /api/booking
 *
 * Creates a booking after recalculating:
 *
 * - opening hours
 * - service duration
 * - service price
 * - existing booking conflicts
 */
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
        {
          status: 400,
        },
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
        {
          status: 400,
        },
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
        {
          status: 400,
        },
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
        {
          status: 400,
        },
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
        {
          status: 400,
        },
      );
    }

    const bookingDate = toDateOnly(data.bookingDate);

    const booking = await prisma.$transaction(
      async (tx) => {
        const existingBookings = await tx.booking.findMany({
          where: {
            bookingDate,
            bookingStatus: {
              not: BookingStatus.CANCELLED,
            },
          },

          select: {
            startAt: true,
            endAt: true,
          },
        });

        const hasConflict = existingBookings.some((booking) =>
          isTimeConflict(startAt, endAt, booking, rules.bufferMinutes),
        );

        if (hasConflict) {
          throw new Error("BOOKING_TIME_UNAVAILABLE");
        }

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
              create: services.map((service) => ({
                serviceId: service.id,
                serviceName: service.name,
                price: service.price,
                durationMinutes: service.durationMinutes,
              })),
            },
          },

          include: {
            bookingServices: true,
          },
        });
      },

      {
        isolationLevel: "Serializable",
      },
    );

    void sendBookingNotifications({
      fullName: data.fullName,
      phone: data.phone,
      vehicle: data.vehicle,
      serviceNames: booking.bookingServices.map((s) => s.serviceName),
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
      {
        status: 201,
      },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "BOOKING_TIME_UNAVAILABLE"
    ) {
      return NextResponse.json(
        {
          success: false,
          status: 409,
          message:
            "The selected appointment time is no longer available. Please select another time.",
        },
        {
          status: 409,
        },
      );
    }

    if (error instanceof Error && error.message === "SERVICE_UNAVAILABLE") {
      const missingIds =
        (
          error as Error & {
            missingIds?: string[];
          }
        ).missingIds ?? [];

      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "One or more selected services are unavailable.",
          missingIds,
        },
        {
          status: 400,
        },
      );
    }

    if (
      error instanceof Error &&
      error.message === "BOOKING_SETTINGS_NOT_CONFIGURED"
    ) {
      return NextResponse.json(
        {
          success: false,
          status: 500,
          message: "Booking settings are not configured.",
        },
        {
          status: 500,
        },
      );
    }

    if (error instanceof Error && error.message === "INVALID_BOOKING_HOURS") {
      return NextResponse.json(
        {
          success: false,
          status: 500,
          message: "The configured booking hours are invalid.",
        },
        {
          status: 500,
        },
      );
    }

    console.error("Create booking error:", error);

    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Unable to create booking.",
      },
      {
        status: 500,
      },
    );
  }
}
