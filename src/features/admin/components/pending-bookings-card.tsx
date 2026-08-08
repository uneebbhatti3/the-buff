"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatSlotLabel } from "@/features/booking/utils/booking-utils";
import type { DashboardPendingItem } from "@/features/admin/types/admin-types.types";

type Props = {
  pending: DashboardPendingItem[];
  loading: boolean;
  onRefresh: () => void;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function PendingBookingsCard({
  pending,
  loading,
  onRefresh,
}: Props) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  async function handleConfirm(id: string) {
    setConfirmingId(id);
    try {
      await axios.patch(`/api/admin/bookings/${id}`, { status: "CONFIRMED" });
      toast.success("Booking confirmed.");
      onRefresh();
    } catch {
      toast.error("Failed to confirm booking.");
    } finally {
      setConfirmingId(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Bookings</CardTitle>
        <CardAction>
          <Link
            href="/admin/bookings?status=PENDING"
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
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        ) : pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
            <ClipboardList className="h-8 w-8" />
            <p className="text-sm">No pending bookings.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {pending.map((item, idx) => (
              <div key={item.id}>
                <div className="py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{item.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.phone}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.vehicle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(item.bookingDate)} &middot;{" "}
                        {formatSlotLabel(
                          new Date(item.startAt),
                          new Date(item.endAt),
                        )}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.services.map((s) => (
                          <Badge
                            key={s}
                            variant="secondary"
                            className="text-xs"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={confirmingId === item.id}
                      onClick={() => handleConfirm(item.id)}
                      className="shrink-0"
                    >
                      {confirmingId === item.id ? "Confirming…" : "Confirm"}
                    </Button>
                  </div>
                </div>
                {idx < pending.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
