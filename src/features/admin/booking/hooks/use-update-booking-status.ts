"use client";

import { useState } from "react";
import axios from "axios";
import { AdminBooking, BookingStatus } from "../../types/admin-types.types";

const useUpdateBookingStatus = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updateStatus = async (
    id: string,
    status: BookingStatus,
  ): Promise<AdminBooking> => {
    setLoadingId(id);

    try {
      const response = await axios.patch<{ success: boolean; booking: AdminBooking }>(
        `/api/admin/bookings/${id}`,
        { status },
      );

      return response.data.booking;
    } finally {
      setLoadingId(null);
    }
  };

  return { updateStatus, loadingId };
};

export default useUpdateBookingStatus;
