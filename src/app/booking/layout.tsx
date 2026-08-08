import Header from "@/components/common/header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
