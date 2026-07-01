import BookingForm from "@/components/booking/booking-form";

export const metadata = {
  title: "Book Appointment",
  description:
    "Book your car detailing appointment with The Buff. Select a service, choose an available date and time, and submit your appointment request.",
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