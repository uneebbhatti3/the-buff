"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { DashboardData } from "@/features/admin/types/admin-types.types";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<{ success: boolean } & DashboardData>(
        "/api/admin/dashboard",
      );
      const { stats, todaySchedule, pendingBookings, recentBookings } =
        res.data;
      setData({ stats, todaySchedule, pendingBookings, recentBookings });
    } catch {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
