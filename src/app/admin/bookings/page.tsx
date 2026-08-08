import BookingsTable from "@/features/admin/booking/components/bookings-table";

export const metadata = {
  title: "Bookings | Admin",
  description:
    "Manage all customer bookings in the admin dashboard. View, edit, or delete car wash bookings and see complete details for each customer reservation.",
};

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>

        <p className="text-muted-foreground">Manage all customer bookings.</p>
      </div>

      <BookingsTable />
    </div>
  );
}
