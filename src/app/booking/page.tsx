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
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* Page header */}
      <div className="border-b border-white/8 px-5 py-12 md:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-5 bg-[#C1121F]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
              Book an appointment
            </p>
          </div>

          <h1 className="mt-4 text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">
            Your next transformation
            <br />
            starts here.
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 py-14 md:px-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
