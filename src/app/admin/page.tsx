import DashboardContent from "@/features/admin/components/dashboard-content";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Welcome back, Admin!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Here&apos;s a snapshot of today&apos;s bookings and activities. Hope
          you have a productive day!
        </p>
      </div>
      <DashboardContent />
    </div>
  );
}
