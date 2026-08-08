/*
  Warnings:

  - Added the required column `durationMinutes` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'CONFIRMED';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_startAt_endAt_idx" ON "Booking"("startAt", "endAt");
