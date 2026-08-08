const TIMEZONE = "Asia/Karachi";
const TIMEZONE_OFFSET = "+05:00";

export const WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export function getWeekday(dateString: string): Weekday {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return WEEKDAYS[date.getUTCDay()];
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function toDateOnly(dateString: string): Date {
  return new Date(`${dateString}T00:00:00.000Z`);
}

export function toDateTime(dateString: string, time: string): Date {
  return new Date(`${dateString}T${time}:00${TIMEZONE_OFFSET}`);
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIMEZONE,
  }).format(date);
}

export function formatSlotLabel(startAt: Date, endAt: Date): string {
  return `${formatTime(startAt)} – ${formatTime(endAt)}`;
}

export function getTodayInPakistan(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
