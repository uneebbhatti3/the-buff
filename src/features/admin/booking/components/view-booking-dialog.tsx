import {
  CalendarDays,
  Clock3,
  Car,
  Phone,
  User,
  FileText,
  BadgeInfo,
  DollarSign,
  Tag,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { AdminBooking, BookingStatus } from "../../types/admin-types.types";
import { formatSlotLabel } from "@/features/booking/utils/booking-utils";

type ViewBookingDialogProps = {
  booking: AdminBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const STATUS_CLASSES: Record<BookingStatus, string> = {
  PENDING: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  CONFIRMED: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  IN_PROGRESS: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  COMPLETED: "border-green-500/40 text-green-400 bg-green-500/10",
  CANCELLED: "border-red-500/40 text-red-400 bg-red-500/10",
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-lg border p-2">
        <Icon className="h-4 w-4" />
      </div>

      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function formatPKR(amount: number): string {
  return `Rs. ${new Intl.NumberFormat("en-PK").format(amount)}`;
}

export default function ViewBookingDialog({
  booking,
  open,
  onOpenChange,
}: ViewBookingDialogProps) {
  if (!booking) return null;

  const slotLabel = formatSlotLabel(
    new Date(booking.startAt),
    new Date(booking.endAt),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Booking Details</DialogTitle>
          <DialogDescription>
            Complete information about this booking.
          </DialogDescription>
        </DialogHeader>

        <div
          className="space-y-8 overflow-y-auto py-4"
          style={{ maxHeight: "70vh" }}
        >
          {/* Booking Info */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
              Booking Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailItem
                icon={BadgeInfo}
                label="Booking ID"
                value={
                  <span className="break-all text-xs font-mono">
                    {booking.id}
                  </span>
                }
              />

              <DetailItem
                icon={Tag}
                label="Status"
                value={
                  <Badge
                    variant="outline"
                    className={STATUS_CLASSES[booking.bookingStatus]}
                  >
                    {STATUS_LABELS[booking.bookingStatus]}
                  </Badge>
                }
              />

              <DetailItem
                icon={CalendarDays}
                label="Date"
                value={formatDate(booking.bookingDate)}
              />

              <DetailItem icon={Clock3} label="Time" value={slotLabel} />

              <DetailItem
                icon={DollarSign}
                label="Total"
                value={formatPKR(booking.totalPrice)}
              />
            </div>
          </section>

          <Separator />

          {/* Customer */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
              Customer
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailItem icon={User} label="Full Name" value={booking.fullName} />
              <DetailItem icon={Phone} label="Phone" value={booking.phone} />
            </div>
          </section>

          <Separator />

          {/* Vehicle & Services */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
              Vehicle & Services
            </h3>

            <DetailItem icon={Car} label="Vehicle" value={booking.vehicle} />

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Services
              </p>

              <div className="flex flex-wrap gap-2">
                {booking.bookingServices.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-full border px-3 py-1 text-xs"
                  >
                    <span className="font-medium">{service.serviceName}</span>
                    <span className="ml-2 text-muted-foreground">
                      {formatPKR(service.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Separator />

          {/* Notes */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
              Additional Notes
            </h3>

            <div className="rounded-xl border p-4">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-sm leading-7">
                  {booking.notes || "No notes were provided by the customer."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
