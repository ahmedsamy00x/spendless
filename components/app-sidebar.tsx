import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Card } from "iconsax-reactjs";
import logo from "@/public/Selection.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Subscriptions",
    url: "/dashboard/subscriptions",
    icon: Card,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-1 relative mb-2 -ml-4 py-8">
            <Image src={logo} alt="SpendLess" className="max-w-full" />
            <span className="text-primary text-3xl font-bold italic absolute right-8">
              SpendLess
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
