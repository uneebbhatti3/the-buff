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
import type {
  DashboardRecentItem,
  BookingStatus,
} from "@/features/admin/types/admin-types.types";

type Props = {
  recent: DashboardRecentItem[];
  loading: boolean;
};

const STATUS_CLASSES: Record<BookingStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  IN_PROGRESS: "bg-purple-100 text-purple-800 border-purple-200",
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK").format(amount);
}

export default function RecentBookingsCard({ recent, loading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
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
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
            <CalendarClock className="h-8 w-8" />
            <p className="text-sm">No recent bookings.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {recent.map((item, idx) => (
              <div key={item.id}>
                <div className="py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{item.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.vehicle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(item.bookingDate)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge
                        className={`text-xs border ${STATUS_CLASSES[item.bookingStatus]}`}
                        variant="outline"
                      >
                        {STATUS_LABELS[item.bookingStatus]}
                      </Badge>
                      <span className="text-sm font-medium">
                        Rs. {formatPKR(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                {idx < recent.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
