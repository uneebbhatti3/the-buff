"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader2, Phone, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  vehicle_name: string | null;
  service_types: string[];
  notes: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
};

function formatService(service: string) {
  return service
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStatusBadgeClass(status: BookingStatus) {
  switch (status) {
    case "pending":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-200";
    case "confirmed":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-200";
    case "cancelled":
      return "border-red-500/20 bg-red-500/10 text-red-200";
    case "completed":
      return "border-blue-500/20 bg-blue-500/10 text-blue-200";
    default:
      return "border-white/10 bg-white/5 text-zinc-300";
  }
}

export default function AdminBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);

      const response = await fetch("/api/admin/bookings", {
        cache: "no-store",
      });

      const result = await response.json();

      if (result.success) {
        setBookings(result.data);
      }

      setLoading(false);
    }

    fetchBookings();
  }, []);

  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        accessorKey: "customer_name",
        header: "Customer",
        cell: ({ row }) => {
          const booking = row.original;

          return (
            <div>
              <p className="font-medium text-[#F5F2EC]">
                {booking.customer_name}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {booking.vehicle_name || "Vehicle not provided"}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
          const phone = row.original.phone;

          return (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {phone}
            </a>
          );
        },
      },
      {
        accessorKey: "service_types",
        header: "Services",
        cell: ({ row }) => {
          const services = row.original.service_types ?? [];

          return (
            <div className="flex max-w-xs flex-wrap gap-2">
              {services.length > 0 ? (
                services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
                  >
                    {formatService(service)}
                  </span>
                ))
              ) : (
                <span className="text-zinc-600">No services</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "booking_date",
        header: "Date",
        cell: ({ row }) => {
          const date = row.original.booking_date;

          return (
            <span className="text-zinc-300">
              {format(new Date(date), "MMM d, yyyy")}
            </span>
          );
        },
      },
      {
        accessorKey: "start_time",
        header: "Time",
        cell: ({ row }) => (
          <span className="text-zinc-300">
            {row.original.start_time} - {row.original.end_time}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <Badge
              variant="outline"
              className={`capitalize ${getStatusBadgeClass(status)}`}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Requested",
        cell: ({ row }) => (
          <span className="text-zinc-500">
            {format(new Date(row.original.created_at), "MMM d, h:mm a")}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: bookings,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-md border border-white/10 bg-[#111111]">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-white/10 bg-[#111111] p-4 sm:p-5">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-zinc-500">Total bookings</p>
          <p className="mt-1 text-2xl font-medium text-[#F5F2EC]">
            {bookings.length}
          </p>
        </div>

        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
          <Input
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search bookings..."
            className="h-12 rounded-full border-white/10 bg-[#0B0B0B] pl-11 text-[#F5F2EC] placeholder:text-zinc-600 focus-visible:ring-white/20"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-white/10">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-white/10 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap bg-[#0B0B0B] text-xs uppercase tracking-[0.18em] text-zinc-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-white/10 hover:bg-white/[0.03]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap py-4 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-white/10">
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-zinc-500"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-zinc-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-white/10 bg-transparent text-[#F5F2EC] hover:bg-white hover:text-black"
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-white/10 bg-transparent text-[#F5F2EC] hover:bg-white hover:text-black"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}