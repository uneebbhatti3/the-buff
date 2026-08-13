import { BusinessHoursRecord } from "../types/booking-hours.types";

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const DEFAULT_BUSINESS_HOURS: BusinessHoursRecord = WEEKDAYS.reduce(
  (acc, day) => {
    acc[day] = {
      open: "09:00",
      close: "17:00",
      closed: false,
    };
    return acc;
  },
  {} as BusinessHoursRecord,
);
