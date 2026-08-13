import { FunctionTool } from "@google/adk";
import { Prisma } from "../../../generated/prisma/client";
import prisma from "@/lib/prisma";

// Converts a "HH:mm" 24-hour string (e.g. "22:00", "00:00") to a 12-hour
// display string (e.g. "10:00 PM", "12:00 AM").
function formatTimeString(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hours24 = Number(hourStr);
  const minutes = Number(minuteStr);
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

const getBusinessHours = new FunctionTool({
  name: "get_business_hours",

  description:
    "Retrieves The Buff's current operating hours for every day of the week, read live from the database. Returns one entry per weekday that exists in the database, ordered Monday through Sunday — this is not filtered to today only. Each entry has: weekday (e.g. 'MONDAY'), isOpen (boolean — false means the studio is closed that entire day), and hours (a ready-to-display string, either a formatted range like '9:00 AM - 10:00 PM' or the literal string 'Closed' — use this string exactly as returned; do not attempt to recalculate, reformat, or convert the times yourself). Hours can differ by day and can change at any time via the owner's admin dashboard, so always call this tool fresh for any hours-related question rather than reusing a value from earlier in the conversation, even within the same conversation. Call this tool whenever a customer asks when the studio is open, what today's or a specific weekday's hours are, or whether the studio is open on a given day. This tool reflects the studio's standing weekly schedule only — it does not account for one-off holidays or temporary closures. If a customer asks about a specific calendar date rather than a general weekday, answer with that weekday's standard hours and mention they may want to confirm directly with the studio in case that date is a holiday or special closure.",

  execute: async function () {
    try {
      const bookingHours = await prisma.bookingHours.findMany({
        orderBy: { weekday: "asc" },
      });

      const report = bookingHours.map((entry) => ({
        weekday: entry.weekday,
        isOpen: !entry.closed,
        hours: entry.closed
          ? "Closed"
          : `${formatTimeString(entry.open)} - ${formatTimeString(entry.close)}`,
      }));

      return {
        status: "success",
        statusCode: 200,
        report,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(
          "get_business_hours — known Prisma error:",
          error.code,
          error.message,
        );
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error(
          "get_business_hours — DB connection/initialization error:",
          error.message,
        );
      } else {
        console.error("get_business_hours — unexpected error:", error);
      }

      return {
        status: "error",
        report:
          "Sorry, I couldn't retrieve the current business hours. Please try again shortly, or contact the studio directly if you need immediate assistance.",
      };
    }
  },
});

export default getBusinessHours;
