import type { Metadata } from "next";
import BookingHoursForm from "@/features/admin/booking-hours/components/booking-hours-form";

export const metadata: Metadata = {
  title: "Booking Hours",
  description:
    "Manage your business opening hours and control when customers can book car detailing appointments. Set daily schedules, mark closed days, and keep your booking calendar in sync.",
  keywords: [
    "booking hours",
    "business hours",
    "appointment schedule",
    "admin booking settings",
    "car detailing availability",
    "The Buff admin",
    "weekly schedule",
    "opening hours",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Booking Hours | The Buff Admin",
    description:
      "Configure weekly business hours and availability for customer bookings in The Buff admin dashboard.",
    type: "website",
    siteName: "The Buff",
  },
  twitter: {
    card: "summary",
    title: "Booking Hours | The Buff Admin",
    description:
      "Set opening and closing times for each day of the week and manage customer booking availability.",
  },
};

export default function BookingHoursPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Booking Hours</h1>
        <p className="max-w-2xl text-muted-foreground">
          Set the opening hours during which customers can book appointments.
          Mark days as closed to hide them from the public booking flow.
        </p>
      </div>

      <BookingHoursForm />
    </div>
  );
}
