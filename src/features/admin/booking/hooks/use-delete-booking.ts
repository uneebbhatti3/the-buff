"use client";

import { useState } from "react";
import axios from "axios";

const useDeleteBooking = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const deleteBooking = async (id: string): Promise<void> => {
    setLoadingId(id);

    try {
      await axios.delete(`/api/admin/bookings/${id}`);
    } finally {
      setLoadingId(null);
    }
  };

  return { deleteBooking, loadingId };
};

export default useDeleteBooking;
