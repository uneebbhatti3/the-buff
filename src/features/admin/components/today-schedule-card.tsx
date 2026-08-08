import Link from "next/link";
import { CalendarClock } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatSlotLabel } from "@/features/booking/utils/booking-utils";
import type { DashboardScheduleItem } from "@/features/admin/types/admin-types.types";

type Props = {
  schedule: DashboardScheduleItem[];
  loading: boolean;
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "text-blue-600",
  IN_PROGRESS: "text-purple-600",
};

export default function TodayScheduleCard({ schedule, loading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Schedule</CardTitle>
        <CardAction>
          <Link
            href="/admin/bookings"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-5 w-36" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
            ))}
          </div>
        ) : schedule.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
            <CalendarClock className="h-8 w-8" />
            <p className="text-sm">No appointments scheduled for today.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {schedule.map((item, idx) => (
              <div key={item.id}>
                <div className="flex items-start gap-4 py-4">
                  <span
                    className={`text-sm font-medium w-40 shrink-0 ${STATUS_COLORS[item.bookingStatus] ?? "text-foreground"}`}
                  >
                    {formatSlotLabel(
                      new Date(item.startAt),
                      new Date(item.endAt),
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.fullName}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.vehicle}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.services.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {idx < schedule.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
