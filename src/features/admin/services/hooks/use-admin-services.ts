"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AdminService } from "../types/service.types";

export function useAdminServices() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get<{
        success: boolean;
        services: AdminService[];
      }>("/api/admin/services");

      setServices(data.services ?? []);
    } catch {
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchServices();
  }, [fetchServices]);

  const addServiceToList = (service: AdminService) => {
    setServices((prev) => [...prev, service]);
  };

  const updateServiceInList = (updated: AdminService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s)),
    );
  };

  const removeServiceFromList = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    services,
    loading,
    error,
    refresh: fetchServices,
    addServiceToList,
    updateServiceInList,
    removeServiceFromList,
  };
}
