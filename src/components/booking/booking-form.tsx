"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Car, Check, Clock, Loader2, Phone } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/lib/supabase";
import { isPastDate, isSunday, TIME_SLOTS } from "@/lib/booking-slots";
import Link from "next/link";

type Slot = {
  label: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

const services = [
  { label: "Interior Detailing", value: "interior_detailing" },
  { label: "Exterior Washing", value: "exterior_washing" },
  { label: "Paint Correction", value: "paint_correction" },
  { label: "Compounding", value: "compounding" },
  { label: "Waxing", value: "waxing" },
  { label: "Protective Coating", value: "protective_coating" },
  { label: "Complete Detail", value: "complete_detail" },
];

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [notes, setNotes] = useState("");

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "No date selected";
    return format(selectedDate, "EEEE, MMMM d, yyyy");
  }, [selectedDate]);

  const selectedSlotLabel = useMemo(() => {
    if (!selectedSlot) return "No time selected";
    return TIME_SLOTS.find((slot) => slot.startTime === selectedSlot)?.label;
  }, [selectedSlot]);

  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate) return;

      setLoadingSlots(true);
      setSelectedSlot("");

      const date = format(selectedDate, "yyyy-MM-dd");

      const { data, error } = await supabase
        .from("booking_availability")
        .select("booking_date,start_time,end_time,status")
        .eq("booking_date", date);

      if (error) {
        console.error(error);
        setSlots([]);
        setLoadingSlots(false);
        return;
      }

      const reservedStartTimes = new Set(
        data?.map((booking) => booking.start_time) ?? []
      );

      const mappedSlots = TIME_SLOTS.map((slot) => ({
        ...slot,
        available: !reservedStartTimes.has(slot.startTime),
      }));

      setSlots(mappedSlots);
      setLoadingSlots(false);
    }

    fetchAvailability();
  }, [selectedDate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDate) {
      alert("Please select a booking date.");
      return;
    }

    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    if (!serviceType) {
      alert("Please select a service.");
      return;
    }

    const selectedTimeSlot = TIME_SLOTS.find(
      (slot) => slot.startTime === selectedSlot
    );

    if (!selectedTimeSlot) {
      alert("Invalid time slot selected.");
      return;
    }

    setSubmitting(true);

    const bookingDate = format(selectedDate, "yyyy-MM-dd");

    const { error } = await supabase.from("bookings").insert({
      customer_name: customerName,
      phone,
      vehicle_name: vehicleName || null,
      service_type: serviceType,
      notes: notes || null,
      booking_date: bookingDate,
      start_time: selectedTimeSlot.startTime,
      end_time: selectedTimeSlot.endTime,
      status: "pending",
    });

    if (error) {
      console.error(error);

      if (error.code === "23505") {
        alert("This time slot is already reserved. Please choose another slot.");
      } else {
        alert("Failed to submit booking request.");
      }

      setSubmitting(false);
      return;
    }

    setBookingSuccess(true);

    setCustomerName("");
    setPhone("");
    setVehicleName("");
    setServiceType("");
    setNotes("");
    setSelectedDate(undefined);
    setSelectedSlot("");
    setSlots([]);
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
            Thank you for booking with The Buff. Your selected time slot has been
            reserved as a request. Our team will contact you shortly to confirm
            the appointment details.
          </p>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
            <a
              href="tel:03214012924"
              className="inline-flex items-center justify-center rounded-full bg-[#F5F2EC] px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-white"
            >
              Call Now
            </a>

            <button
              type="button"
              onClick={() => setBookingSuccess(false)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F2EC] transition hover:border-white/30"
            >
              Book Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F2EC] transition hover:border-white/30"
            >
              Back Home
            </Link>
          </div>

          <p className="mt-6 text-sm leading-6 text-zinc-600">
            Please keep your phone available. Confirmation may depend on service
            type, vehicle condition, and slot availability.
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
        {/* Left: Calendar */}
        <section className="border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div className="mb-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <CalendarDays className="h-5 w-5 text-zinc-300" />
            </div>

            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Select date
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Choose an available day.
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Sundays and past dates are unavailable for booking.
            </p>
          </div>

          {/* Calendar wrapper: fixes mobile overflow */}
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
              Selected date
            </p>
            <p className="mt-2 text-lg font-medium text-[#F5F2EC]">
              {formattedDate}
            </p>
          </div>
        </section>

        {/* Right: Form */}
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Clock className="h-5 w-5 text-zinc-300" />
            </div>

            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Select time
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Pick your preferred slot.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {!selectedDate && (
              <div className="col-span-full rounded-[1.25rem] border border-white/10 bg-[#0B0B0B] p-5 text-sm leading-6 text-zinc-500">
                Choose a date first to view available time slots.
              </div>
            )}

            {selectedDate && loadingSlots && (
              <div className="col-span-full flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-[#0B0B0B] p-5 text-sm text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking available slots...
              </div>
            )}

            {selectedDate &&
              !loadingSlots &&
              slots.map((slot) => (
                <button
                  key={slot.startTime}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.startTime)}
                  className={`min-h-14 rounded-[1rem] border px-4 py-3 text-left text-sm transition ${selectedSlot === slot.startTime
                    ? "border-[#F5F2EC] bg-[#F5F2EC] text-black"
                    : slot.available
                      ? "border-white/10 bg-[#0B0B0B] text-[#F5F2EC] hover:border-white/30"
                      : "cursor-not-allowed border-white/5 bg-white/[0.03] text-zinc-700"
                    }`}
                >
                  <span className="block font-medium">{slot.label}</span>
                  <span
                    className={`mt-1 block text-xs ${selectedSlot === slot.startTime
                      ? "text-black/60"
                      : slot.available
                        ? "text-zinc-500"
                        : "text-zinc-700"
                      }`}
                  >
                    {slot.available ? "Available" : "Reserved"}
                  </span>
                </button>
              ))}
          </div>

          <div className="my-8 h-px bg-white/10" />

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
              <label className="mb-2 block text-sm text-zinc-400">
                Service
              </label>
              <Select value={serviceType} onValueChange={setServiceType} required>
                <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] focus:ring-white/20">
                  <SelectValue placeholder="Select detailing service" />
                </SelectTrigger>

                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">
                Notes
              </label>
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
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">Date</span>
                <span className="text-right text-[#F5F2EC]">
                  {formattedDate}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">Time</span>
                <span className="text-right text-[#F5F2EC]">
                  {selectedSlotLabel}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
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
            className="mt-6 h-13 w-full rounded-full bg-[#F5F2EC] text-sm font-semibold uppercase tracking-[0.16em] text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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
            Your selected slot will be reserved after submission. The Buff will
            contact you to confirm the appointment.
          </p>
        </section>
      </div>
    </form>
  );
}