import PageLayout from "@/layouts/page-layout";

interface AdminAuthLayout {
  children: React.ReactNode;
}

export default function Layout({ children }: AdminAuthLayout) {
  return <PageLayout>{children}</PageLayout>;
}
