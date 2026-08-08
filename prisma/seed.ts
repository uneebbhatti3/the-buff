import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Weekday } from "../generated/prisma/enums";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// ---------- Booking settings (singleton row) ----------
async function seedBookingSettings() {
  await prisma.bookingSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      slotIntervalMinutes: 30,
      bufferMinutes: 15,
      bookingWindowDays: 90,
      minimumNoticeMinutes: 120,
    },
  });
}

// ---------- Business hours: 9:00 AM – 10:00 PM, every day ----------
async function seedBusinessHours() {
  const weekdays = Object.values(Weekday);

  for (const weekday of weekdays) {
    await prisma.bookingHours.upsert({
      where: { weekday },
      update: {},
      create: {
        weekday,
        open: "09:00",
        close: "22:00",
        closed: false,
      },
    });
  }
}

// ---------- Services ----------
// PLACEHOLDER DATA. Only "Interior Detailing" and "Premium Wash" durations come
// from the original business spec. Everything else — every price, and every
// other duration — is an estimate. Confirm real numbers with the owner and
// update via admin dashboard (or re-run this seed) before going live.
const SERVICES = [
  {
    name: "Interior Detailing",
    slug: "interior-detailing",
    price: 6000,
    durationMinutes: 120,
    displayOrder: 1,
  },
  {
    name: "Exterior Detailing",
    slug: "exterior-detailing",
    price: 5000,
    durationMinutes: 90,
    displayOrder: 2,
  },
  {
    name: "Complete Detailing",
    slug: "complete-detailing",
    price: 10000,
    durationMinutes: 180,
    displayOrder: 3,
  },
  {
    name: "Premium Wash",
    slug: "premium-wash",
    price: 2000,
    durationMinutes: 60,
    displayOrder: 4,
  },
  {
    name: "Compound & Paint Correction",
    slug: "paint-correction",
    price: 15000,
    durationMinutes: 240,
    displayOrder: 5,
  },
  {
    name: "Carnauba Wax",
    slug: "carnauba-wax",
    price: 4000,
    durationMinutes: 60,
    displayOrder: 6,
  },
  {
    name: "Ceramic Wax",
    slug: "ceramic-wax",
    price: 5000,
    durationMinutes: 60,
    displayOrder: 7,
  },
  {
    name: "Graphene Wax",
    slug: "graphene-wax",
    price: 6000,
    durationMinutes: 60,
    displayOrder: 8,
  },
  {
    name: "Hybrid Wax",
    slug: "hybrid-wax",
    price: 5500,
    durationMinutes: 60,
    displayOrder: 9,
  },
  {
    name: "Ceramic Spray Coating",
    slug: "ceramic-spray-coating",
    price: 20000,
    durationMinutes: 180,
    displayOrder: 10,
  },
  {
    name: "Graphene Spray Coating",
    slug: "graphene-spray-coating",
    price: 25000,
    durationMinutes: 180,
    displayOrder: 11,
  },
  {
    name: "Hybrid Spray Coating",
    slug: "hybrid-spray-coating",
    price: 22000,
    durationMinutes: 180,
    displayOrder: 12,
  },
  {
    name: "Rust Removal & Chrome Polish",
    slug: "rust-removal-chrome-polish",
    price: 8000,
    durationMinutes: 120,
    displayOrder: 13,
  },
];

async function seedServices() {
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, isActive: true },
    });
  }
}

async function main() {
  await seedBookingSettings();
  await seedBusinessHours();
  await seedServices();
  console.log(
    "Seed complete: booking settings, business hours, and services created.",
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
