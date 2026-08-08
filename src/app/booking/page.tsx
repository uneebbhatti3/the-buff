import BookingForm from "@/features/booking/components/booking-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment | The Buff Detailing Lahore",
  description:
    "Book your professional car or motorcycle detailing appointment at The Buff in Lahore. Choose from a range of services including paint correction, ceramic coating, interior cleaning, and more. Select your preferred service, date, and time, and enjoy premium vehicle care by expert detailers.",
  keywords: [
    "car detailing Lahore",
    "motorcycle detailing Lahore",
    "book car appointment Lahore",
    "book detailing appointment",
    "ceramic coating Lahore",
    "interior cleaning",
    "paint correction",
    "vehicle detailing booking",
    "The Buff",
    "auto detailing appointment",
  ],
  openGraph: {
    title: "Book Appointment | The Buff Detailing Lahore",
    description:
      "Schedule your detailing session with The Buff. Select a service, pick an available date, and book car or bike detailing by experts in Lahore.",
    url: "https://thebuffdetailing.vercel.app/booking",
    type: "website",
    images: [
      {
        url: "/og-booking.jpg",
        width: 1200,
        height: 630,
        alt: "Book Detailing Appointment at The Buff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Appointment | The Buff Detailing Lahore",
    description:
      "Book your car or motorcycle detailing session in Lahore online. Choose a service and time at The Buff for premium care, ceramic coatings, and auto restoration.",
    images: ["/og-booking.jpg"],
  },
  alternates: {
    canonical: "https://thebuffdetailing.vercel.app/booking",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 pb-20 pt-28 text-[#F5F2EC] sm:px-5 md:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500 sm:text-sm">
            Book an appointment
          </p>

          <h1 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-5xl md:text-7xl">
            Schedule your detailing session.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Choose your preferred service, select an available date and time,
            and submit your request. The Buff will contact you to confirm the
            appointment.
          </p>
        </div>

        <BookingForm />
      </section>
    </main>
  );
}
