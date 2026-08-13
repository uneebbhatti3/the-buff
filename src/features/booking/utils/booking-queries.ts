import prisma from "@/lib/prisma";
import { getWeekday, timeToMinutes } from "./booking-utils";

export async function getBookingRules(date: string) {
  const weekday = getWeekday(date);

  const [bookingHours, settings] = await Promise.all([
    prisma.bookingHours.findUnique({ where: { weekday } }),
    prisma.bookingSettings.findUnique({ where: { id: "default" } }),
  ]);

  if (!settings) {
    throw new Error("BOOKING_SETTINGS_NOT_CONFIGURED");
  }

  if (!bookingHours || bookingHours.closed) {
    return { isOpen: false as const };
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

export async function getActiveServices(serviceIds: string[]) {
  const uniqueIds = [...new Set(serviceIds)];

  const services = await prisma.service.findMany({
    where: { id: { in: uniqueIds }, isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  if (services.length !== uniqueIds.length) {
    const foundIds = new Set(services.map((s) => s.id));
    const missingIds = uniqueIds.filter((id) => !foundIds.has(id));
    const error = new Error("SERVICE_UNAVAILABLE") as Error & {
      missingIds: string[];
    };
    error.missingIds = missingIds;
    throw error;
  }

  const durationMinutes = services.reduce(
    (total, s) => total + s.durationMinutes,
    0,
  );

  const totalPrice = services.reduce((total, s) => total + s.price, 0);

  return { services, durationMinutes, totalPrice };
}
