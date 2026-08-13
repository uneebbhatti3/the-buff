"use client";

import { useMemo, useState } from "react";
import { Clock3, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_BUSINESS_HOURS, WEEKDAYS } from "../constants/days";
import { BusinessHoursRecord } from "../types/booking-hours.types";
import BookingHoursDayRow from "./booking-hours-day-row";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function BookingHoursForm() {
  const [hours, setHours] = useState<BusinessHoursRecord>(
    DEFAULT_BUSINESS_HOURS,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get<{ success: boolean; data: { weekday: string; open: string; close: string; closed: boolean }[] }>(
        "/api/admin/business-hours",
      )
      .then(({ data }) => {
        if (data.success && data.data.length > 0) {
          const loaded: BusinessHoursRecord = { ...DEFAULT_BUSINESS_HOURS };
          for (const entry of data.data) {
            const day =
              entry.weekday.charAt(0) + entry.weekday.slice(1).toLowerCase();
            loaded[day] = {
              open: entry.open,
              close: entry.close,
              closed: entry.closed,
            };
          }
          setHours(loaded);
        }
      })
      .catch(() => {
        toast.error("Failed to load existing hours.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const openDaysCount = useMemo(
    () => WEEKDAYS.filter((day) => !hours[day].closed).length,
    [hours],
  );

  const handleTimeChange = (
    day: string,
    type: "open" | "close",
    value: string,
  ) => {
    setHours((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        [type]: value,
      },
    }));
  };

  const handleClosedChange = (day: string, closed: boolean) => {
    setHours((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        closed,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const payload = WEEKDAYS.map((day) => ({
        weekday: day.toUpperCase(), // confirm this matches your WEEKDAYS constant casing — see note below
        open: hours[day].open,
        close: hours[day].close,
        closed: hours[day].closed,
      }));

      const { data } = await axios.post("/api/admin/business-hours", payload);

      if (!data.success) throw new Error(data.message ?? data.error);
      toast.success("Business hours updated.");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err instanceof Error ? err.message : "Failed to save hours.",
        );

        console.log(err.response?.data);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Clock3 className="size-5" />
          </div>
          <div className="space-y-1">
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Set opening and closing times for each day across the full 24-hour
              range. Closed days will not appear on the booking calendar.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit} aria-disabled={isLoading}>
        <CardContent className="space-y-4 pt-6">
          <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{openDaysCount}</span>{" "}
            of {WEEKDAYS.length} days open for bookings. Adjust any time slot
            between 12:00 AM and 11:59 PM.
          </div>

          <div className="hidden grid-cols-[minmax(120px,1fr)_1fr_1fr_auto] gap-4 px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
            <span>Day</span>
            <span>Opens</span>
            <span>Closes</span>
            <span className="text-right">Status</span>
          </div>

          <div className="space-y-3">
            {WEEKDAYS.map((day) => (
              <BookingHoursDayRow
                key={day}
                day={day}
                hours={hours[day]}
                onTimeChange={(type, value) =>
                  handleTimeChange(day, type, value)
                }
                onClosedChange={(closed) => handleClosedChange(day, closed)}
              />
            ))}
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Changes apply to all future booking slots once saved.
          </p>
          <Button
            type="submit"
            disabled={isSaving || isLoading}
            className="w-full sm:w-auto"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : "Save Hours"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
