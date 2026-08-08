"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

export function useDeleteService() {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function deleteService(id: string): Promise<void> {
    setDeletingId(id);

    try {
      await axios.delete(`/api/admin/services/${id}`);
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Failed to delete service.")
          : "Failed to delete service.";

      throw new Error(message);
    } finally {
      setDeletingId(null);
    }
  }

  return { deletingId, deleteService };
}
