-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "services" SET DEFAULT ARRAY[]::"ServiceType"[];
