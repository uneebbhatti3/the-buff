import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Admin services fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Service name is required." },
        { status: 400 },
      );
    }

    if (price === undefined || price === null || price < 0) {
      return NextResponse.json(
        { success: false, message: "A valid price is required." },
        { status: 400 },
      );
    }

    if (!durationMinutes || durationMinutes < 1) {
      return NextResponse.json(
        { success: false, message: "A valid duration is required." },
        { status: 400 },
      );
    }

    const baseSlug = toSlug(name.trim());
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.service.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const service = await prisma.service.create({
      data: {
        name: name.trim(),
        slug,
        description: description?.trim() || null,
        price: Math.round(price),
        durationMinutes: Math.round(durationMinutes),
        isActive: isActive ?? true,
        displayOrder: displayOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    console.error("Admin service create error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service." },
      { status: 500 },
    );
  }
}
