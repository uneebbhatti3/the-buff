"use client";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  Phone,
  RotateCcw,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import useCreateBooking from "../hooks/use-create-booking";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="text-[10px] font-medium text-zinc-700">{number}</span>
      <span className="h-px flex-1 bg-white/8" />
      <span className="text-[10px] uppercase tracking-[0.32em] text-zinc-500">
        {title}
      </span>
    </div>
  );
}

export default function BookingForm() {
  const {
    success,
    loading,
    formData,

    services,
    servicesLoading,
    servicesError,

    availableSlots,
    durationMinutes,
    totalPrice,

    checkingAvailability,
    availabilityError,
    submitError,

    setSuccess,
    handleOnChange,
    handleDateChange,
    handleTimeChange,
    handleServiceChange,
    handleOnSubmit,
  } = useCreateBooking();

  const selectedSlot = availableSlots.find(
    (slot) => slot.startTime === formData.startTime,
  );

  const selectedServices = services.filter((s) =>
    formData.services.includes(s.id),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookingEndDate = new Date(today);
  bookingEndDate.setFullYear(today.getFullYear() + 1);

  /* ── SUCCESS SCREEN ──────────────────────────────────────────────── */
  if (success) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/4">
          <Check className="h-6 w-6 text-[#F5F2EC]" strokeWidth={1.5} />
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-zinc-500">
          Booking Request Received
        </p>

        <h2 className="mt-4 max-w-lg text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-[#F5F2EC] sm:text-4xl md:text-5xl">
          Your appointment has been submitted.
        </h2>

        <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
          Your slot has been reserved. The Buff will review your request and
          contact you to confirm.
        </p>

        <div className="mt-10 w-full max-w-xs space-y-3">
          <a
            href="https://wa.me/923214012924?text=I%20have%20submitted%20a%20booking%20request%20through%20The%20Buff%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-100"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Continue on WhatsApp
          </a>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Book again
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-start gap-3 border-t border-white/8 pt-8 text-left">
          <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" />
          <p className="text-xs leading-5 text-zinc-600">
            Please keep your phone available. The Buff may contact you to verify
            your vehicle or service details.
          </p>
        </div>
      </div>
    );
  }

  /* ── MAIN FORM ───────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">

        {/* ── LEFT PANEL: DATE ─────────────────────────────────────── */}
        <div>
          <SectionHeader number="01" title="Select Date" />

          {/* Calendar */}
          <div className="rounded-2xl border border-white/8 bg-[#0D0D0D] p-4 sm:p-5">
            <Calendar
              mode="single"
              selected={formData.bookingDate}
              onSelect={handleDateChange}
              disabled={(date) => {
                const d = new Date(date);
                d.setHours(0, 0, 0, 0);
                return d < today || d > bookingEndDate;
              }}
              startMonth={today}
              endMonth={bookingEndDate}
              defaultMonth={formData.bookingDate ?? today}
              captionLayout="label"
              fixedWeeks
              showOutsideDays
              className="w-full rounded-none bg-transparent p-0 text-[#F5F2EC]"
              classNames={{
                root: "relative w-full bg-transparent text-[#F5F2EC]",
                months: "w-full",
                month: "w-full space-y-4",
                month_caption:
                  "relative flex h-10 w-full items-center justify-center",
                caption_label: "text-sm font-medium text-[#F5F2EC]",
                nav: "absolute inset-x-0 top-0 flex h-10 items-center justify-between",
                button_previous:
                  "z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-400 transition hover:border-white/20 hover:text-white",
                button_next:
                  "z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-400 transition hover:border-white/20 hover:text-white",
                month_grid: "w-full border-collapse",
                weekdays: "grid grid-cols-7",
                weekday:
                  "flex h-9 items-center justify-center text-[10px] font-normal uppercase text-zinc-600",
                weeks: "space-y-1",
                week: "grid grid-cols-7",
                day: "relative flex h-10 items-center justify-center text-sm",
                day_button:
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm text-[#F5F2EC] transition hover:bg-white/8",
                selected:
                  "[&>button]:bg-[#F5F2EC] [&>button]:text-black [&>button:hover]:bg-white [&>button:hover]:text-black",
                today: "[&>button]:border [&>button]:border-white/25",
                outside: "opacity-20",
                disabled:
                  "opacity-20 [&>button]:pointer-events-none [&>button]:cursor-not-allowed",
                hidden: "invisible",
              }}
            />
          </div>

          {/* Selected appointment card */}
          <div className="mt-4 rounded-2xl border border-white/8 bg-[#0D0D0D] px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Selected Appointment
            </p>
            <p className="mt-3 text-lg font-medium leading-tight tracking-[-0.02em] text-[#F5F2EC]">
              {formData.bookingDate
                ? format(formData.bookingDate, "EEEE, MMMM d, yyyy")
                : "No date selected"}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {selectedSlot?.label ?? "No time selected"}
            </p>

            {selectedServices.length > 0 && (
              <div className="mt-4 border-t border-white/8 pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                  Services
                </p>
                <div className="mt-2 space-y-1">
                  {selectedServices.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-zinc-400">{s.name}</span>
                      <span className="text-sm font-medium text-[#F5F2EC]">
                        Rs. {formatPrice(s.price)}
                      </span>
                    </div>
                  ))}
                </div>
                {durationMinutes > 0 && (
                  <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      Est. Duration
                    </span>
                    <span className="text-sm text-zinc-400">
                      {formatDuration(durationMinutes)}
                    </span>
                  </div>
                )}
                {totalPrice > 0 && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      Est. Total
                    </span>
                    <span className="font-medium text-[#F5F2EC]">
                      Rs. {formatPrice(totalPrice)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trust note */}
          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-zinc-600">
            <Clock3 className="mt-0.5 h-3 w-3 shrink-0" />
            All appointments are subject to confirmation. The Buff will contact
            you within a few hours.
          </p>
        </div>

        {/* ── RIGHT PANEL: FORM FIELDS ─────────────────────────────── */}
        <div className="space-y-12">

          {/* 02 — YOUR DETAILS */}
          <div>
            <SectionHeader number="02" title="Your Details" />

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="full-name"
                  className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                >
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleOnChange}
                  placeholder="Enter your full name"
                  required
                  className="h-12 rounded-xl border-white/10 bg-[#0D0D0D] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/15"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                  >
                    Phone / WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleOnChange}
                    placeholder="0321-0000000"
                    required
                    className="h-12 rounded-xl border-white/10 bg-[#0D0D0D] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/15"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="vehicle"
                    className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-zinc-500"
                  >
                    Vehicle
                  </Label>
                  <Input
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleOnChange}
                    placeholder="Honda Civic, Corolla..."
                    required
                    className="h-12 rounded-xl border-white/10 bg-[#0D0D0D] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/15"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 03 — SELECT SERVICES */}
          <div>
            <SectionHeader number="03" title="Select Services" />

            {servicesError ? (
              <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                {servicesError}
              </div>
            ) : servicesLoading ? (
              <div className="flex items-center gap-3 py-8 text-sm text-zinc-500">
                <Spinner />
                Loading services
              </div>
            ) : (
              <>
                {/* Column headers */}
                <div className="mb-1 flex items-center justify-between px-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-700">
                    Service
                  </span>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-700">
                      Duration
                    </span>
                    <span className="w-20 text-right text-[10px] uppercase tracking-[0.22em] text-zinc-700">
                      Price
                    </span>
                  </div>
                </div>

                {/* Service rows */}
                <div className="divide-y divide-white/6 rounded-xl border border-white/8 bg-[#0D0D0D] overflow-hidden">
                  {services.map((service) => {
                    const isSelected = formData.services.includes(service.id);

                    return (
                      <Label
                        key={service.id}
                        htmlFor={`service-${service.id}`}
                        className={`flex cursor-pointer items-center justify-between px-5 py-4 transition-colors ${
                          isSelected
                            ? "bg-white/4"
                            : "hover:bg-white/[0.025]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Checkbox
                            id={`service-${service.id}`}
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleServiceChange(service.id, checked === true)
                            }
                            className="rounded-sm border-white/20 data-[state=checked]:border-[#F5F2EC] data-[state=checked]:bg-[#F5F2EC] data-[state=checked]:text-black"
                          />
                          <span
                            className={`text-sm font-medium transition-colors ${
                              isSelected ? "text-[#F5F2EC]" : "text-zinc-300"
                            }`}
                          >
                            {service.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-6">
                          <span className="text-xs text-zinc-600">
                            {formatDuration(service.durationMinutes)}
                          </span>
                          <span
                            className={`w-20 text-right text-sm font-medium ${
                              isSelected ? "text-[#F5F2EC]" : "text-zinc-400"
                            }`}
                          >
                            Rs. {formatPrice(service.price)}
                          </span>
                        </div>
                      </Label>
                    );
                  })}
                </div>

                {durationMinutes > 0 && (
                  <p className="mt-3 text-right text-xs text-zinc-600">
                    Estimated session:{" "}
                    <span className="text-zinc-400">
                      {formatDuration(durationMinutes)}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* 04 — AVAILABLE TIME */}
          <div>
            <SectionHeader number="04" title="Available Time" />

            {!formData.bookingDate || formData.services.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/8 px-5 py-8 text-center text-sm text-zinc-600">
                <CalendarDays className="mx-auto mb-3 h-5 w-5 opacity-40" />
                Select a date and at least one service to view available times.
              </div>
            ) : checkingAvailability ? (
              <div className="flex items-center justify-center gap-3 rounded-xl border border-white/8 bg-[#0D0D0D] px-5 py-8 text-sm text-zinc-500">
                <Spinner />
                Checking availability
              </div>
            ) : availabilityError ? (
              <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                {availabilityError}
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/8 px-5 py-8 text-center text-sm text-zinc-600">
                No available times for this date. Please choose another day.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableSlots.map((slot) => {
                  const isSelected = formData.startTime === slot.startTime;

                  return (
                    <button
                      key={slot.startTime}
                      type="button"
                      onClick={() => handleTimeChange(slot.startTime)}
                      className={`flex h-12 items-center justify-center rounded-xl border text-sm font-medium tracking-[-0.01em] transition ${
                        isSelected
                          ? "border-[#F5F2EC] bg-[#F5F2EC] text-black"
                          : "border-white/8 bg-[#0D0D0D] text-zinc-300 hover:border-white/20 hover:text-[#F5F2EC]"
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 05 — NOTES */}
          <div>
            <SectionHeader number="05" title="Additional Notes" />

            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleOnChange}
              placeholder="Vehicle condition, special requests, preferred products..."
              className="min-h-28 rounded-xl border-white/10 bg-[#0D0D0D] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/15"
            />
          </div>

          {/* ── SUMMARY + SUBMIT ───────────────────────────────────── */}
          <div className="border-t border-white/8 pt-8">
            {/* Price breakdown */}
            {selectedServices.length > 0 && (
              <div className="mb-6 space-y-2">
                {selectedServices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-500">{s.name}</span>
                    <span className="text-zinc-400">
                      Rs. {formatPrice(s.price)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-white/8 pt-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    Estimated total
                  </span>
                  <span className="text-xl font-medium tracking-[-0.02em] text-[#F5F2EC]">
                    Rs. {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            )}

            {/* Error */}
            {submitError && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              >
                {submitError}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={
                loading ||
                servicesLoading ||
                checkingAvailability ||
                !formData.bookingDate ||
                !formData.startTime ||
                !formData.fullName.trim() ||
                !formData.phone.trim() ||
                !formData.vehicle.trim() ||
                formData.services.length === 0
              }
              className="h-14 w-full cursor-pointer rounded-full bg-[#F5F2EC] text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-white disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Submitting booking
                </span>
              ) : (
                "Confirm Booking"
              )}
            </Button>

            <a
              href="tel:03214012924"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-4 text-[11px] uppercase tracking-[0.22em] text-zinc-500 transition hover:border-white/20 hover:text-zinc-300"
            >
              <Phone className="h-3.5 w-3.5" />
              Prefer calling? 0321-4012924
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
