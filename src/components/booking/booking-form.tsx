"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Car, Check, Loader2, Phone } from "lucide-react";
import Link from "next/link";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { supabase } from "@/lib/supabase";
import { isPastDate, isSunday } from "@/lib/booking-slots";

const services = [
  { label: "Interior Detailing", value: "interior_detailing" },
  { label: "Exterior Detailing", value: "exterior_detailing" },
  { label: "Complete Detailing", value: "complete_detailing" },
  { label: "Premium Wash", value: "premium_wash" },
  { label: "Compound & Paint Correction", value: "compound_paint_correction" },
  { label: "Carnauba Wax", value: "carnauba_wax" },
  { label: "Ceramic Wax", value: "ceramic_wax" },
  { label: "Graphene Wax", value: "graphene_wax" },
  { label: "Hybrid Wax", value: "hybrid_wax" },
  { label: "Ceramic Spray Coating", value: "ceramic_spray_coating" },
  { label: "Graphene Spray Coating", value: "graphene_spray_coating" },
  { label: "Hybrid Spray Coating", value: "hybrid_spray_coating" },
  {
    label: "Rust Removal & Chrome Polish",
    value: "rust_removal_chrome_polish",
  },
];

function formatService(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ownerWhatsAppUrl, setOwnerWhatsAppUrl] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "No day selected";
    return format(selectedDate, "EEEE, MMMM d, yyyy");
  }, [selectedDate]);

  const selectedServicesLabel = useMemo(() => {
    if (selectedServices.length === 0) return "No service selected";
    return selectedServices.map(formatService).join(", ");
  }, [selectedServices]);

  function toggleService(serviceValue: string) {
    setSelectedServices((current) => {
      if (current.includes(serviceValue)) {
        return current.filter((value) => value !== serviceValue);
      }

      return [...current, serviceValue];
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDate) {
      alert("Please select your preferred booking day.");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    setSubmitting(true);

    const bookingDate = format(selectedDate, "yyyy-MM-dd");

    const { error } = await supabase.from("bookings").insert({
      customer_name: customerName,
      phone,
      vehicle_name: vehicleName || null,
      service_types: selectedServices,
      notes: notes || null,
      booking_date: bookingDate,
      status: "pending",
    });

    if (error) {
      console.error(error);
      alert("Failed to submit booking request.");
      setSubmitting(false);
      return;
    }

    setBookingSuccess(true);

    setCustomerName("");
    setPhone("");
    setVehicleName("");
    setSelectedServices([]);
    setNotes("");
    setSelectedDate(undefined);
    setSubmitting(false);
  }

  if (bookingSuccess) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111]">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-16 text-center sm:px-8 sm:py-20">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#F5F2EC] text-black">
            <Check className="h-8 w-8" />
          </div>

          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Booking request sent
          </p>

          <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.05em] text-[#F5F2EC] sm:text-5xl">
            Your appointment request has been received.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Thank you for booking with The Buff. Your preferred day has been
            submitted. The Buff will contact you shortly and confirm the exact
            appointment time according to availability.
          </p>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
            <a
              href="tel:03214012924"
              className="inline-flex items-center justify-center rounded-full bg-[#F5F2EC] px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-white"
            >
              Call Now
            </a>

            <a
              href={ownerWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F2EC] transition hover:border-white/30"
            >
              Notify WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setBookingSuccess(false)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F2EC] transition hover:border-white/30"
            >
              Book Again
            </button>
          </div>

          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F2EC] transition hover:border-white/30"
          >
            Back Home
          </Link>

          <p className="mt-6 text-sm leading-6 text-zinc-600">
            Please keep your phone available. Appointment time will be confirmed
            after Ahmad reviews the selected service, day, and vehicle
            condition.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111]"
    >
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div className="mb-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <CalendarDays className="h-5 w-5 text-zinc-300" />
            </div>

            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Select preferred day
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Choose the day you want to visit.
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Select your preferred day. The Buff will confirm the exact time
              after reviewing the service and availability.
            </p>
          </div>

          <div className="w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => isPastDate(date) || isSunday(date)}
              className="w-full rounded-none bg-transparent p-0 text-[#F5F2EC]"
              classNames={{
                root: "w-full bg-transparent text-[#F5F2EC]",
                months: "w-full bg-transparent",
                month: "w-full space-y-4 bg-transparent",
                month_caption:
                  "relative flex items-center justify-center px-8 py-2 bg-transparent",
                caption_label: "text-sm font-medium text-[#F5F2EC]",
                nav: "absolute left-0 right-0 top-2 flex items-center justify-between px-1",
                button_previous:
                  "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:bg-white/10",
                button_next:
                  "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:bg-white/10",
                month_grid: "w-full border-collapse bg-transparent",
                weekdays: "grid grid-cols-7 bg-transparent",
                weekday:
                  "flex h-9 items-center justify-center text-[11px] font-normal uppercase text-zinc-500",
                weeks: "space-y-1 bg-transparent",
                week: "grid grid-cols-7 bg-transparent",
                day: "relative flex h-10 items-center justify-center bg-transparent text-center text-sm sm:h-11",
                day_button:
                  "flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-sm text-[#F5F2EC] transition hover:bg-white/10 sm:h-9 sm:w-9",
                selected:
                  "[&>button]:bg-[#F5F2EC] [&>button]:text-black [&>button:hover]:bg-[#F5F2EC] [&>button:hover]:text-black",
                today: "[&>button]:border [&>button]:border-white/20",
                outside: "text-zinc-700 opacity-40",
                disabled:
                  "cursor-not-allowed text-zinc-700 opacity-35 [&>button]:hover:bg-transparent",
                hidden: "invisible",
              }}
            />
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Preferred day
            </p>
            <p className="mt-2 text-lg font-medium text-[#F5F2EC]">
              {formattedDate}
            </p>
          </div>
        </section>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Car className="h-5 w-5 text-zinc-300" />
            </div>

            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Your details
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Tell us about the vehicle.
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Ahmad will review your request and confirm the appointment time
              based on the selected day, service duration, and availability.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">
                Full name
              </label>
              <Input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your full name"
                required
                className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Phone / WhatsApp
              </label>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="0321-0000000"
                required
                className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Vehicle
              </label>
              <Input
                value={vehicleName}
                onChange={(event) => setVehicleName(event.target.value)}
                placeholder="Honda Civic, Corolla, BMW..."
                className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="mb-3 flex items-end justify-between gap-4">
                <div>
                  <label className="block text-sm text-zinc-400">
                    Services
                  </label>
                  <p className="mt-1 text-xs text-zinc-600">
                    Select one or more services.
                  </p>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
                  {selectedServices.length} selected
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const checked = selectedServices.includes(service.value);

                  return (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => toggleService(service.value)}
                      className={`flex min-h-14 items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                        checked
                          ? "border-[#F5F2EC] bg-[#F5F2EC] text-black"
                          : "border-white/10 bg-[#0B0B0B] text-[#F5F2EC] hover:border-white/30"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {service.label}
                      </span>

                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          checked
                            ? "border-black bg-black text-white"
                            : "border-white/20 text-transparent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">Notes</label>
              <Textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Vehicle condition, preferred package, special request..."
                className="min-h-28 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
              />
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Booking summary
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-500">Preferred day</span>
                <span className="text-right text-[#F5F2EC]">
                  {formattedDate}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-500">Time</span>
                <span className="text-right text-[#F5F2EC]">
                  To be confirmed by The Buff
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-500">Services</span>
                <span className="max-w-[65%] text-right text-[#F5F2EC]">
                  {selectedServicesLabel}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-500">Status</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-xs text-zinc-300">
                  <Check className="h-3.5 w-3.5" />
                  Request confirmation
                </span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-6 h-[52px] w-full rounded-full bg-[#F5F2EC] text-sm font-semibold uppercase tracking-[0.16em] text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting
              </span>
            ) : (
              "Request Booking"
            )}
          </Button>

          <a
            href="tel:03214012924"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-4 text-sm text-[#F5F2EC] transition hover:border-white/30"
          >
            <Phone className="h-4 w-4" />
            Prefer calling? 0321-4012924
          </a>

          <p className="mt-5 text-center text-sm leading-6 text-zinc-600">
            The Buff will contact you to confirm the exact appointment time.
          </p>
        </section>
      </div>
    </form>
  );
}
