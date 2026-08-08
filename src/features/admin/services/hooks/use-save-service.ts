"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AdminService } from "../types/service.types";

type ServicePayload = {
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  isActive: boolean;
  displayOrder: number;
};

export function useSaveService() {
  const [saving, setSaving] = useState(false);

  async function createService(
    payload: ServicePayload,
  ): Promise<AdminService> {
    setSaving(true);

    try {
      const { data } = await axios.post<{
        success: boolean;
        service: AdminService;
      }>("/api/admin/services", payload);

      return data.service;
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Failed to create service.")
          : "Failed to create service.";

      throw new Error(message);
    } finally {
      setSaving(false);
    }
  }

  async function updateService(
    id: string,
    payload: Partial<ServicePayload>,
  ): Promise<AdminService> {
    setSaving(true);

    try {
      const { data } = await axios.patch<{
        success: boolean;
        service: AdminService;
      }>(`/api/admin/services/${id}`, payload);

      return data.service;
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Failed to update service.")
          : "Failed to update service.";

      throw new Error(message);
    } finally {
      setSaving(false);
    }
  }

  return { saving, createService, updateService };
}
