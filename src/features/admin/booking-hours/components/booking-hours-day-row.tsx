import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BusinessHour } from "../types/booking-hours.types";

type BookingHoursDayRowProps = {
  day: string;
  hours: BusinessHour;
  onTimeChange: (type: "open" | "close", value: string) => void;
  onClosedChange: (closed: boolean) => void;
};

function formatTimeLabel(value: string) {
  if (!value) return "—";

  const [hour, minute] = value.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export default function BookingHoursDayRow({
  day,
  hours,
  onTimeChange,
  onClosedChange,
}: BookingHoursDayRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-4 rounded-lg border px-4 py-3 transition-colors sm:grid-cols-[minmax(120px,1fr)_1fr_1fr_auto]",
        hours.closed
          ? "border-dashed bg-muted/40"
          : "border-border bg-background",
      )}
    >
      <div className="flex items-center justify-between gap-3 sm:block">
        <p className="font-medium">{day}</p>
        <Badge
          variant={hours.closed ? "secondary" : "default"}
          className="sm:hidden"
        >
          {hours.closed ? "Closed" : "Open"}
        </Badge>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${day}-open`} className="text-xs text-muted-foreground">
          Opens
        </Label>
        <Input
          id={`${day}-open`}
          type="time"
          value={hours.open}
          onChange={(event) => onTimeChange("open", event.target.value)}
          disabled={hours.closed}
          className="bg-background"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${day}-close`} className="text-xs text-muted-foreground">
          Closes
        </Label>
        <Input
          id={`${day}-close`}
          type="time"
          value={hours.close}
          onChange={(event) => onTimeChange("close", event.target.value)}
          disabled={hours.closed}
          className="bg-background"
        />
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <Badge
          variant={hours.closed ? "secondary" : "default"}
          className="hidden sm:inline-flex"
        >
          {hours.closed ? "Closed" : "Open"}
        </Badge>

        <Label className="flex cursor-pointer items-center gap-2 text-sm font-normal">
          <Checkbox
            checked={hours.closed}
            onCheckedChange={(checked) => onClosedChange(!!checked)}
            aria-label={`Mark ${day} as closed`}
          />
          Closed
        </Label>

        {!hours.closed && hours.open && hours.close && (
          <p className="text-xs text-muted-foreground sm:text-right">
            {formatTimeLabel(hours.open)} - {formatTimeLabel(hours.close)}
          </p>
        )}
      </div>
    </div>
  );
}
