import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import AdminBookingsTable from "@/components/admin/admin-bookings-table";
import AdminLogoutButton from "@/components/admin/admin-logout-button";

export const metadata = {
  title: "Bookings | The Buff Admin",
  description: "Manage The Buff appointment requests.",
};

export default async function AdminBookingsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!verifyAdminSessionToken(sessionToken)) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-28 text-[#F5F2EC] sm:px-5 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              Admin Dashboard
            </p>

            <h1 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.05em] md:text-6xl">
              Booking requests.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
              View customer appointment requests, selected services, dates,
              time slots, and booking status.
            </p>
          </div>

          <AdminLogoutButton />
        </div>

        <AdminBookingsTable />
      </section>
    </main>
  );
}