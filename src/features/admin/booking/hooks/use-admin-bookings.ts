"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AdminBooking, BookingStatus } from "../../types/admin-types.types";

export type BookingFilters = {
  search: string;
  status: BookingStatus | "";
  sort: "date_desc" | "date_asc";
};

type BookingsResponse = {
  success: boolean;
  bookings: AdminBooking[];
  total: number;
  page: number;
  totalPages: number;
};

const LIMIT = 20;

const useAdminBookings = () => {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState<BookingFilters>({
    search: "",
    status: "",
    sort: "date_desc",
  });

  const fetchBookings = useCallback(
    async (targetPage = page) => {
      setLoading(true);
      setError("");

      try {
        const params: Record<string, string> = {
          page: String(targetPage),
          limit: String(LIMIT),
          sort: filters.sort,
        };

        if (filters.search) params.search = filters.search;
        if (filters.status) params.status = filters.status;

        const response = await axios.get<BookingsResponse>(
          "/api/admin/bookings",
          { params },
        );

        setBookings(response.data.bookings);
        setTotal(response.data.total);
        setTotalPages(response.data.totalPages);
        setPage(response.data.page);
      } catch {
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [filters, page],
  );

  useEffect(() => {
    void fetchBookings(1);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateFilters = (patch: Partial<BookingFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    void fetchBookings(nextPage);
  };

  const updateBookingInList = (updated: AdminBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b)),
    );
  };

  const removeBookingFromList = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setTotal((prev) => prev - 1);
  };

  return {
    bookings,
    loading,
    error,
    page,
    total,
    totalPages,
    filters,
    updateFilters,
    goToPage,
    refresh: () => void fetchBookings(page),
    updateBookingInList,
    removeBookingFromList,
  };
};

export default useAdminBookings;
