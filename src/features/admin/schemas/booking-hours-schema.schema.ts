import { z } from "zod";

export const WeekdayEnum = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const BookingHoursSchema = z.object({
  id: z.string().cuid(),
  weekday: WeekdayEnum,
  open: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format for 'open'. Use HH:mm",
  }),
  close: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format for 'close'. Use HH:mm",
  }),
  closed: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export default BookingHoursSchema;
