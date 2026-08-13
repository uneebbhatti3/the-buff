import { FunctionTool } from "@google/adk";
import { CreateBookingSchema } from "@/features/booking/schemas/booking-schema";

const bookUserBookingTool = new FunctionTool({
  name: "book_user_booking",

  description:
    "Creates a booking request for the customer at The Buff. Call this tool only after you have collected ALL of the following from the customer: fullName (their full name), phone (Pakistani phone number), vehicle (make/model of their car), bookingDate (YYYY-MM-DD format), startTime (HH:mm from a slot the customer explicitly selected), and at least one service ID obtained from get_services. The notes field is optional. The API validates hours, service availability, and slot conflicts — relay any error message it returns directly to the customer.",

  parameters: CreateBookingSchema,

  execute: async function ({
    fullName,
    phone,
    vehicle,
    bookingDate,
    startTime,
    services,
    notes,
  }) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

      const response = await fetch(`${baseUrl}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          vehicle,
          bookingDate,
          startTime,
          services,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          status: "error",
          report:
            data.message ??
            "Failed to create the booking request. Please ask the customer to try again or contact the studio directly via WhatsApp.",
        };
      }

      return {
        status: "success",
        statusCode: 201,
        report: {
          bookingId: data.booking.id,
          fullName: data.booking.fullName,
          vehicle: data.booking.vehicle,
          bookingDate,
          startTime,
          durationMinutes: data.booking.durationMinutes,
          totalPrice: data.booking.totalPrice,
          services: data.booking.bookingServices.map(
            (s: { serviceName: string }) => s.serviceName,
          ),
        },
      };
    } catch (error) {
      console.error("book_user_booking — unexpected error:", error);

      return {
        status: "error",
        report:
          "Sorry, I couldn't submit the booking request right now. Please ask the customer to try again shortly, or contact The Buff directly via WhatsApp.",
      };
    }
  },
});

export default bookUserBookingTool;
