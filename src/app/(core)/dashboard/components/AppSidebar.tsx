"use client";
// Dependencies
import * as React from "react";
// Components
import Link from "next/link";
import Title from "@/components/ui/Title";
import { NavSecondary } from "./NavSecondary";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// Icons
import { GalleryVerticalEnd } from "lucide-react";
// Data
import { menuDataOptions } from "@/utils/menuDataOptions";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 "
            >
              <Link href="/dashboard" className="flex items-center gap-2 ">
                <GalleryVerticalEnd className="size-4 text-primary" />
                <Title text="Bookea.me" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={menuDataOptions.navMain.map(item => ({
            ...item,
            icon: item.icon,
          }))}
        />
        <NavSecondary
          items={menuDataOptions.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={menuDataOptions.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
