import { Metadata } from "next";
import { LoginForm } from "@/features/admin/(auth)/login/components/login-form";

export const metadata: Metadata = {
  title: "Admin Login | Business Management Dashboard",
  description:
    "Secure access to your business management admin dashboard. Login to manage bookings, working hours, users, and more. Fast, secure, and easy authentication for administrators.",
  keywords: [
    "admin login",
    "business dashboard",
    "secure authentication",
    "manage bookings",
    "admin panel",
    "login page",
    "administrator access",
    "business management",
    "schedule management",
    "dashboard login",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Admin Login | Business Management Dashboard",
    description:
      "Access your business dashboard securely. Manage bookings, schedules, and users from the centralized admin panel.",
    url: "/admin/login",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Login | Business Management Dashboard",
    description:
      "Login securely to your business admin dashboard to manage bookings, hours, and users efficiently.",
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
