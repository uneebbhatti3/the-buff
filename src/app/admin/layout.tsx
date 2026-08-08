import AdminLayout from "@/layouts/admin-layout";

interface AdminAuthLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AdminAuthLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
