import AdminLoginForm from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Admin Login | The Buff",
  description: "Admin login for The Buff booking management.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-28 text-[#F5F2EC]">
      <section className="mx-auto flex max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            The Buff Admin
          </p>

          <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em]">
            Sign in to manage bookings.
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            Access the private admin area to view customer appointment requests.
          </p>
        </div>

        <AdminLoginForm />
      </section>
    </main>
  );
}