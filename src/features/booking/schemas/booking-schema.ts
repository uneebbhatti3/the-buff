import { z } from "zod";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const CreateBookingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must contain at least 2 characters.")
    .max(120, "Full name cannot exceed 120 characters."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Phone number cannot exceed 20 characters."),

  vehicle: z
    .string()
    .trim()
    .min(2, "Vehicle name must contain at least 2 characters.")
    .max(120, "Vehicle name cannot exceed 120 characters."),

  bookingDate: z.string().regex(DATE_REGEX, "Invalid booking date."),

  startTime: z.string().regex(TIME_REGEX, "Invalid booking time."),

  services: z
    .array(z.string().cuid())
    .min(1, "Please select at least one service."),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});

export const BookingAvailabilitySchema = z.object({
  date: z.string().regex(DATE_REGEX, "Invalid booking date."),

  services: z
    .array(z.string().cuid())
    .min(1, "Please select at least one service."),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;

export type BookingAvailabilityInput = z.infer<
  typeof BookingAvailabilitySchema
>;
