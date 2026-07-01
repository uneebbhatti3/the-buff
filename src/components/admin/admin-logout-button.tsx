"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin");
    router.refresh();
  }

  return (
    <Button
      type="button"
      onClick={handleLogout}
      variant="outline"
      className="rounded-full border-white/10 bg-transparent text-[#F5F2EC] hover:bg-white hover:text-black"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}