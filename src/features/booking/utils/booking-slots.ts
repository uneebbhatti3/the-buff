import { BookingSlot, ExistingBooking } from "../types/booking.types";
import {
  addMinutes,
  formatSlotLabel,
  getTodayInPakistan,
  minutesToTime,
  toDateTime,
} from "./booking-utils";

export function isDateInPast(date: string): boolean {
  return date < getTodayInPakistan();
}

export function isTimeConflict(
  candidateStart: Date,
  candidateEnd: Date,
  booking: ExistingBooking,
  bufferMinutes: number,
): boolean {
  const blockedBookingEnd = addMinutes(booking.endAt, bufferMinutes);
  return candidateStart < blockedBookingEnd && candidateEnd > booking.startAt;
}

export function calculateAvailableSlots({
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

    if (candidateStart < earliestAllowedStart) continue;

    const candidateEnd = addMinutes(candidateStart, durationMinutes);
    const blockedEnd = addMinutes(candidateEnd, bufferMinutes);

    if (blockedEnd > closingTime) continue;

    const hasConflict = existingBookings.some((booking) =>
      isTimeConflict(candidateStart, blockedEnd, booking, bufferMinutes),
    );

    if (hasConflict) continue;

    slots.push({
      startTime,
      startAt: candidateStart.toISOString(),
      endAt: candidateEnd.toISOString(),
      label: formatSlotLabel(candidateStart, candidateEnd),
    });
  }

  return slots;
}
