-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('INTERIOR_DETAILING', 'EXTERIOR_DETAILING', 'COMPLETE_DETAILING', 'PREMIUM_WASH', 'COMPOUND_AND_PAINT_CORRECTION', 'CARNAUBA_WAX', 'CERAMIC_WAX', 'GRAPHENE_WAX', 'HYBRID_WAX', 'CERAMIC_SPRAY_COATING', 'GRAPHENE_SPRAY_COATING', 'HYBRID_SPRAY_COATING', 'RUST_REMOVAL_AND_CHROME_POLISH');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "services" "ServiceType"[],
    "notes" TEXT,
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_bookingDate_idx" ON "Booking"("bookingDate");

-- CreateIndex
CREATE INDEX "Booking_bookingStatus_idx" ON "Booking"("bookingStatus");
