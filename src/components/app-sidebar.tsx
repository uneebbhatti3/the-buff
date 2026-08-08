"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  // Settings2Icon,
  Clock3Icon,
  WrenchIcon,
  CalendarClockIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "The Buff Detailing",
    email: "thebuff@gmail.com",
    avatar: "/logo.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: <CalendarClockIcon className="h-5 w-5" />,
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: <WrenchIcon className="h-5 w-5" />,
    },
    {
      title: "Booking Hours",
      url: "/admin/booking-hours",
      icon: <Clock3Icon className="h-5 w-5" />,
    },
    // {
    //   title: "Settings",
    //   url: "/admin/settings",
    //   icon: <Settings2Icon className="h-5 w-5" />,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Image
                  src={"/logo.png"}
                  alt="The Buff Detailing"
                  width={50}
                  height={50}
                />
                <span className="text-base font-semibold">
                  The Buff Detailing
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
