"use client";

import { Button } from "@/components/ui/button";
import { useDashboard } from "@/features/admin/hooks/use-dashboard";
import AdminStatsCard from "@/features/admin/components/admin-stats-card";
import TodayScheduleCard from "@/features/admin/components/today-schedule-card";
import PendingBookingsCard from "@/features/admin/components/pending-bookings-card";
import RecentBookingsCard from "@/features/admin/components/recent-bookings-card";

export default function DashboardContent() {
  const { data, loading, error, refresh } = useDashboard();

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-destructive">{error}</p>
        <Button size="sm" variant="outline" onClick={refresh}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminStatsCard stats={data?.stats} loading={loading} />
      <TodayScheduleCard
        schedule={data?.todaySchedule ?? []}
        loading={loading}
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <PendingBookingsCard
          pending={data?.pendingBookings ?? []}
          loading={loading}
          onRefresh={refresh}
        />
        <RecentBookingsCard
          recent={data?.recentBookings ?? []}
          loading={loading}
        />
      </div>
    </div>
  );
}
