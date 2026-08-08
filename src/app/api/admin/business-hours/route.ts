import { APIResponse } from "@/types/response-types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { WeekdayEnum } from "@/features/admin/schemas/booking-hours-schema.schema";
import prisma from "@/lib/prisma";
import { BookingHours } from "../../../../../generated/prisma/client";

const BusinessHourInput = z
  .object({
    weekday: WeekdayEnum,
    open: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format for 'open'. Use HH:mm",
    }),
    close: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format for 'close'. Use HH:mm",
    }),
    closed: z.boolean(),
  })
  .refine((entry) => entry.closed || entry.open < entry.close, {
    message: "Opening time must be before closing time.",
    path: ["close"],
  });

const BusinessHoursArraySchema = z.array(BusinessHourInput);

export async function GET() {
  try {
    const hours = await prisma.bookingHours.findMany({
      orderBy: { weekday: "asc" },
    });
    return NextResponse.json<APIResponse<BookingHours[]>>({
      success: true,
      status: 200,
      data: hours,
    });
  } catch (error: unknown) {
    return NextResponse.json<APIResponse>(
      { success: false, status: 500, error: "Failed to load business hours." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parseResult = BusinessHoursArraySchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 400,
          error: "Invalid input.",
          message: parseResult.error.issues.map((e) => e.message).join(", "),
        },
        { status: 400 },
      );
    }

    const inputHours = parseResult.data;

    // Atomic: all-or-nothing update across the week
    await prisma.$transaction(
      inputHours.map((entry) =>
        prisma.bookingHours.upsert({
          where: { weekday: entry.weekday },
          update: {
            open: entry.open,
            close: entry.close,
            closed: entry.closed,
          },
          create: {
            weekday: entry.weekday,
            open: entry.open,
            close: entry.close,
            closed: entry.closed,
          },
        }),
      ),
    );

    return NextResponse.json<APIResponse>({
      success: true,
      status: 200,
      message: "Business hours updated successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        status: 500,
        error: `Internal Server Error: ${message}`,
      },
      { status: 500 },
    );
  }
}
