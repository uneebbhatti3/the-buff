"use client";

import {
  ArrowLeft,
  CalendarDays,
  Car,
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

  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  }

  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${hours} ${
    hours === 1 ? "hour" : "hours"
  } ${remainingMinutes} minutes`;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
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

  const selectedServiceLabels = services
    .filter((service) => formData.services.includes(service.id))
    .map((service) => service.name)
    .join(", ");

  const selectedSlot = availableSlots.find(
    (slot) => slot.startTime === formData.startTime,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /*
   * Customer can book up to one year in advance.
   * You can later replace this with bookingWindowDays
   * from your BookingSettings table.
   */
  const bookingEndDate = new Date(today);
  bookingEndDate.setFullYear(today.getFullYear() + 1);

  if (success) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[#0D0D0D]">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/4">
            <Check className="h-7 w-7 text-[#F5F2EC]" strokeWidth={2} />
          </div>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            Booking request received
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#F5F2EC] sm:text-4xl md:text-5xl">
            Your appointment request has been submitted.
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            Your selected appointment time has been reserved. The Buff will
            review your request and contact you if any additional information is
            required.
          </p>

          <div className="mt-9 w-full max-w-md">
            <a
              href="https://wa.me/923214012924?text=I%20have%20submitted%20a%20booking%20request%20through%20The%20Buff%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-black transition hover:bg-zinc-100"
            >
              <MessageCircle className="h-4 w-4" />
              Continue on WhatsApp
            </a>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back home
              </Link>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Book again
              </button>
            </div>
          </div>

          <div className="mt-10 w-full max-w-lg border-t border-white/7 pt-6">
            <div className="flex items-start justify-center gap-3 text-left">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />

              <div>
                <p className="text-sm text-zinc-400">
                  Please keep your phone available.
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-600">
                  The Buff may contact you to verify your vehicle or service
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111]">
      <form onSubmit={handleOnSubmit}>
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          {/* DATE */}
          <section className="border-b border-white/10 p-4 sm:p-6 lg:border-r lg:border-b-0 lg:p-8">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/3">
                <CalendarDays className="h-5 w-5 text-zinc-300" />
              </div>

              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                Select appointment day
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                Choose when you want to visit.
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Select a date and your required services. Available appointment
                times will be calculated automatically.
              </p>
            </div>

            <div className="w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-2 sm:p-4">
              <Calendar
                mode="single"
                selected={formData.bookingDate}
                onSelect={handleDateChange}
                disabled={(date) => {
                  const normalizedDate = new Date(date);
                  normalizedDate.setHours(0, 0, 0, 0);

                  return (
                    normalizedDate < today || normalizedDate > bookingEndDate
                  );
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
                    "z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white",
                  button_next:
                    "z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/3 text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white",
                  month_grid: "w-full border-collapse",
                  weekdays: "grid grid-cols-7",
                  weekday:
                    "flex h-9 items-center justify-center text-[11px] font-normal uppercase text-zinc-500",
                  weeks: "space-y-1",
                  week: "grid grid-cols-7",
                  day: "relative flex h-10 items-center justify-center text-center text-sm sm:h-11",
                  day_button:
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm text-[#F5F2EC] transition hover:bg-white/10",
                  selected:
                    "[&>button]:bg-[#F5F2EC] [&>button]:text-black [&>button:hover]:bg-white [&>button:hover]:text-black",
                  today: "[&>button]:border [&>button]:border-white/30",
                  outside: "text-zinc-700 opacity-40",
                  disabled:
                    "text-zinc-700 opacity-30 [&>button]:pointer-events-none [&>button]:cursor-not-allowed",
                  hidden: "invisible",
                }}
              />
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Selected appointment
              </p>

              <p className="mt-2 text-lg font-medium text-[#F5F2EC]">
                {formData.bookingDate
                  ? format(formData.bookingDate, "EEEE, MMMM d, yyyy")
                  : "No day selected"}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {selectedSlot?.label ?? "No time selected"}
              </p>
            </div>
          </section>

          {/* BOOKING DETAILS */}
          <section className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/3">
                <Car className="h-5 w-5 text-zinc-300" />
              </div>

              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                Booking details
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                Tell us about the vehicle.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* NAME */}
              <div className="sm:col-span-2">
                <Label
                  htmlFor="full-name"
                  className="mb-2 block text-sm text-zinc-400"
                >
                  Full name
                </Label>

                <Input
                  id="full-name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleOnChange}
                  placeholder="Enter your full name"
                  required
                  className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
                />
              </div>

              {/* PHONE */}
              <div>
                <Label
                  htmlFor="phone"
                  className="mb-2 block text-sm text-zinc-400"
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
                  className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
                />
              </div>

              {/* VEHICLE */}
              <div>
                <Label
                  htmlFor="vehicle"
                  className="mb-2 block text-sm text-zinc-400"
                >
                  Vehicle
                </Label>

                <Input
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleOnChange}
                  placeholder="Honda Civic, Corolla, BMW..."
                  required
                  className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
                />
              </div>

              {/* SERVICES */}
              <div className="sm:col-span-2">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <Label className="block text-sm text-zinc-400">
                      Services
                    </Label>

                    <p className="mt-1 text-xs text-zinc-600">
                      Select one or more services.
                    </p>
                  </div>

                  {durationMinutes > 0 && (
                    <span className="text-xs text-zinc-500">
                      Estimated duration: {formatDuration(durationMinutes)}
                    </span>
                  )}
                </div>

                {servicesError ? (
                  <div className="rounded-2xl border border-red-500/15 bg-red-500/5 px-5 py-4 text-sm text-red-300">
                    {servicesError}
                  </div>
                ) : servicesLoading ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0B0B0B] px-5 py-6 text-sm text-zinc-500">
                    <Spinner />
                    Loading services
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((service) => {
                      const isSelected = formData.services.includes(service.id);

                      return (
                        <Label
                          key={service.id}
                          htmlFor={service.id}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                            isSelected
                              ? "border-[#F5F2EC] bg-white/4"
                              : "border-white/10 bg-[#0B0B0B] hover:border-white/25"
                          }`}
                        >
                          <Checkbox
                            id={service.id}
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleServiceChange(service.id, checked === true)
                            }
                            className="rounded-sm border-white/20 data-[state=checked]:border-[#F5F2EC] data-[state=checked]:bg-[#F5F2EC] data-[state=checked]:text-black"
                          />

                          <div className="flex flex-1 items-center justify-between gap-2">
                            <span className="text-sm font-medium text-[#F5F2EC]">
                              {service.name}
                            </span>
                            <div className="shrink-0 text-right">
                              <p className="text-sm font-medium text-[#F5F2EC]">
                                Rs. {formatPrice(service.price)}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {formatDuration(service.durationMinutes)}
                              </p>
                            </div>
                          </div>
                        </Label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* TIME */}
              <div className="sm:col-span-2">
                <div className="mb-3">
                  <Label className="block text-sm text-zinc-400">
                    Available time
                  </Label>

                  <p className="mt-1 text-xs text-zinc-600">
                    Available times are based on your selected services and
                    existing bookings.
                  </p>
                </div>

                {!formData.bookingDate || formData.services.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#0B0B0B] px-5 py-6 text-sm text-zinc-600">
                    Select a date and at least one service to view available
                    times.
                  </div>
                ) : checkingAvailability ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0B0B0B] px-5 py-6 text-sm text-zinc-500">
                    <Spinner />
                    Checking availability
                  </div>
                ) : availabilityError ? (
                  <div className="rounded-2xl border border-red-500/15 bg-red-500/5 px-5 py-4 text-sm text-red-300">
                    {availabilityError}
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-[#0B0B0B] px-5 py-6 text-sm text-zinc-600">
                    No appointment times are available for this date.
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {availableSlots.map((slot) => {
                      const isSelected = formData.startTime === slot.startTime;

                      return (
                        <button
                          key={slot.startTime}
                          type="button"
                          onClick={() => handleTimeChange(slot.startTime)}
                          className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            isSelected
                              ? "border-[#F5F2EC] bg-[#F5F2EC] text-black"
                              : "border-white/10 bg-[#0B0B0B] text-[#F5F2EC] hover:border-white/25"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {slot.label}
                          </span>

                          {isSelected && <Check className="h-4 w-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* NOTES */}
              <div className="sm:col-span-2">
                <Label
                  htmlFor="notes"
                  className="mb-2 block text-sm text-zinc-400"
                >
                  Notes
                </Label>

                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleOnChange}
                  placeholder="Vehicle condition, preferred package, special request..."
                  className="min-h-28 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
                />
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Booking summary
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500">Date</span>

                  <span className="text-right text-[#F5F2EC]">
                    {formData.bookingDate
                      ? format(formData.bookingDate, "EEEE, MMMM d, yyyy")
                      : "No day selected"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500">Time</span>

                  <span className="text-right text-[#F5F2EC]">
                    {selectedSlot?.label ?? "No time selected"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500">Duration</span>

                  <span className="text-right text-[#F5F2EC]">
                    {durationMinutes > 0
                      ? formatDuration(durationMinutes)
                      : "Not calculated"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500">Services</span>

                  <span className="max-w-[65%] text-right text-[#F5F2EC]">
                    {selectedServiceLabels || "No service selected"}
                  </span>
                </div>

                <div className="border-t border-white/8 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Estimated total</span>

                    <span className="text-lg font-medium text-[#F5F2EC]">
                      {totalPrice > 0
                        ? `Rs. ${formatPrice(totalPrice)}`
                        : "Not calculated"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ERROR */}
            {submitError && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              >
                {submitError}
              </div>
            )}

            {/* SUBMIT */}
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
              className="mt-6 w-full cursor-pointer rounded-full bg-white text-black hover:bg-zinc-100"
            >
              {loading ? (
                <>
                  <Spinner />
                  Submitting booking
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>

            <a
              href="tel:03214012924"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-4 text-sm text-[#F5F2EC] transition hover:border-white/30"
            >
              <Phone className="h-4 w-4" />
              Prefer calling? 0321-4012924
            </a>
          </section>
        </div>
      </form>
    </div>
  );
}
