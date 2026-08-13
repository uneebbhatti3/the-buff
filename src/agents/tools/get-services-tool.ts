import prisma from "@/lib/prisma";
import { FunctionTool } from "@google/adk";
import { Prisma } from "../../../generated/prisma/client";

const getServices = new FunctionTool({
  name: "get_services",

  description:
    "Retrieves the complete, current list of services The Buff offers, read live from the database. Returns only services the owner currently has marked active — services the owner has disabled are excluded, since they cannot be booked. Each service in the result includes: id (unique identifier, needed if a later tool call requires selecting a specific service), name (display name, e.g. 'Interior Detailing'), slug (URL-safe identifier), description (short text description of the service, may be null), price (an integer in Pakistani Rupees — a whole-number amount, not cents/paisas — format as 'PKR {price}' when presenting to the customer), durationMinutes (how long this service takes on its own, as an integer), and displayOrder (the studio's preferred display order — the tool already sorts by this, so present results in the order returned rather than re-sorting). Call this tool whenever a customer asks what The Buff offers, asks for a full price list, or hasn't named a specific service you need details on. Do not call get_service_details for a general 'what do you offer' question — this tool alone is sufficient for that. Note: the underlying data model does not currently group services into categories (Detailing, Washing, Wax, etc.) — if you need to present services by category, group them yourself based on their names, since no category field is returned.",

  execute: async function () {
    try {
      const services = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      });

      return {
        status: "success",
        statusCode: 200,
        report: services,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(
          "get_services — known Prisma error:",
          error.code,
          error.message,
        );
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error(
          "get_services — DB connection/initialization error:",
          error.message,
        );
      } else {
        console.error("get_services — unexpected error:", error);
      }

      return {
        status: "error",
        report:
          "Sorry, I couldn't retrieve the current list of services right now. Please try again shortly, or contact the studio directly if you need immediate assistance.",
      };
    }
  },
});

export default getServices;
