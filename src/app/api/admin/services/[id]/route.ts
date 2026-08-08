import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Service not found." },
        { status: 404 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      description?: string;
      price?: number;
      durationMinutes?: number;
      isActive?: boolean;
      displayOrder?: number;
    };

    const { name, description, price, durationMinutes, isActive, displayOrder } =
      body;

    if (name !== undefined && !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Service name cannot be empty." },
        { status: 400 },
      );
    }

    if (price !== undefined && price < 0) {
      return NextResponse.json(
        { success: false, message: "Price cannot be negative." },
        { status: 400 },
      );
    }

    if (durationMinutes !== undefined && durationMinutes < 1) {
      return NextResponse.json(
        { success: false, message: "Duration must be at least 1 minute." },
        { status: 400 },
      );
    }

    let slug = existing.slug;

    if (name && name.trim() !== existing.name) {
      const baseSlug = toSlug(name.trim());
      slug = baseSlug;
      let counter = 1;

      while (
        await prisma.service.findFirst({
          where: { slug, NOT: { id } },
        })
      ) {
        slug = `${baseSlug}-${counter++}`;
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim(), slug }),
        ...(description !== undefined && {
          description: description.trim() || null,
        }),
        ...(price !== undefined && { price: Math.round(price) }),
        ...(durationMinutes !== undefined && {
          durationMinutes: Math.round(durationMinutes),
        }),
        ...(isActive !== undefined && { isActive }),
        ...(displayOrder !== undefined && { displayOrder }),
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Admin service update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Service not found." },
        { status: 404 },
      );
    }

    const usageCount = await prisma.bookingService.count({
      where: { serviceId: id },
    });

    if (usageCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `This service is linked to ${usageCount} booking(s) and cannot be deleted. Deactivate it instead.`,
        },
        { status: 409 },
      );
    }

    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin service delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete service." },
      { status: 500 },
    );
  }
}
