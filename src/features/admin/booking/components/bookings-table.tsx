"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import useAdminBookings from "../hooks/use-admin-bookings";
import useUpdateBookingStatus from "../hooks/use-update-booking-status";
import useDeleteBooking from "../hooks/use-delete-booking";
import ViewBookingDialog from "./view-booking-dialog";

import { AdminBooking, BookingStatus } from "../../types/admin-types.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatSlotLabel } from "@/features/booking/utils/booking-utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const ALL_STATUSES: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_VARIANTS: Record<
  BookingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "outline",
  CONFIRMED: "default",
  IN_PROGRESS: "secondary",
  COMPLETED: "default",
  CANCELLED: "destructive",
};

// Custom class overrides for status badges
const STATUS_CLASSES: Record<BookingStatus, string> = {
  PENDING: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  CONFIRMED: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  IN_PROGRESS: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  COMPLETED: "border-green-500/40 text-green-400 bg-green-500/10",
  CANCELLED: "border-red-500/40 text-red-400 bg-red-500/10",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const date = new Date(iso);

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatPKR(amount: number): string {
  return `Rs. ${new Intl.NumberFormat("en-PK").format(amount)}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge
      variant={STATUS_VARIANTS[status]}
      className={`whitespace-nowrap ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 8 }).map((__, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function DeleteConfirmDialog({
  open,
  booking,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  booking: AdminBooking | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete this booking?
            {booking && (
              <span className="mt-1 block font-medium text-foreground">
                {booking.fullName} — {booking.vehicle}
              </span>
            )}
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookingsTable() {
  const {
    bookings,
    loading,
    error,
    page,
    total,
    totalPages,
    filters,
    updateFilters,
    goToPage,
    refresh,
    updateBookingInList,
    removeBookingFromList,
  } = useAdminBookings();

  const { updateStatus, loadingId: statusLoadingId } =
    useUpdateBookingStatus();
  const { deleteBooking, loadingId: deleteLoadingId } = useDeleteBooking();

  const [viewBooking, setViewBooking] = useState<AdminBooking | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminBooking | null>(null);

  // ── Handlers ──

  const handleStatusChange = async (
    booking: AdminBooking,
    status: BookingStatus,
  ) => {
    try {
      const updated = await updateStatus(booking.id, status);
      updateBookingInList(updated);
      toast.success(`Status updated to ${STATUS_LABELS[status]}.`);
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteBooking(deleteTarget.id);
      removeBookingFromList(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Booking deleted.");
    } catch {
      toast.error("Failed to delete booking. Please try again.");
    }
  };

  // ── Search with debounce (simple approach) ──
  let searchTimeout: ReturnType<typeof setTimeout>;

  const handleSearchChange = (value: string) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => updateFilters({ search: value }), 400);
  };

  // ── Render ──

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, vehicle…"
            defaultValue={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filters.status || "ALL"}
            onValueChange={(v) =>
              updateFilters({ status: v === "ALL" ? "" : (v as BookingStatus) })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(v) =>
              updateFilters({ sort: v as "date_desc" | "date_asc" })
            }
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">Newest first</SelectItem>
              <SelectItem value="date_asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={refresh}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableSkeleton />
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-14 text-center text-sm text-muted-foreground"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      {booking.phone}
                    </div>
                  </TableCell>

                  <TableCell>{booking.vehicle}</TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {booking.bookingServices.map((s) => (
                        <Badge
                          key={s.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {s.serviceName}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {formatDate(booking.bookingDate)}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm">
                    {formatSlotLabel(
                      new Date(booking.startAt),
                      new Date(booking.endAt),
                    )}
                  </TableCell>

                  <TableCell className="whitespace-nowrap font-medium">
                    {formatPKR(booking.totalPrice)}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={booking.bookingStatus} />
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onSelect={() => setViewBooking(booking)}
                          >
                            View details
                          </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                          Change status
                        </DropdownMenuLabel>

                        <DropdownMenuGroup>
                          {ALL_STATUSES.filter(
                            (s) => s !== booking.bookingStatus,
                          ).map((s) => (
                            <DropdownMenuItem
                              key={s}
                              disabled={statusLoadingId === booking.id}
                              onSelect={() =>
                                void handleStatusChange(booking, s)
                              }
                            >
                              {STATUS_LABELS[s]}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          variant="destructive"
                          disabled={deleteLoadingId === booking.id}
                          onSelect={() => setDeleteTarget(booking)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {total === 0
              ? "No bookings"
              : `Showing ${(page - 1) * 20 + 1}–${Math.min(page * 20, total)} of ${total}`}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="px-2">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <ViewBookingDialog
        booking={viewBooking}
        open={viewBooking !== null}
        onOpenChange={(open) => !open && setViewBooking(null)}
      />

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        booking={deleteTarget}
        loading={deleteLoadingId === deleteTarget?.id}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
