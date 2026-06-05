"use client";
import * as React from "react";
import Link from "next/link";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { BookMarked } from "lucide-react";
import { menuDataOptions } from "@/utils/menuDataOptions";
import { useBusinessStore } from "@/store/business.store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const businessName = useBusinessStore(state => state.business?.name);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* ── Brand header ── */}
      <SidebarHeader className="border-b border-sidebar-border/60 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="hover:bg-sidebar-accent data-[slot=sidebar-menu-button]:!p-2"
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <BookMarked className="size-4" />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="font-semibold text-sm truncate">
                    Bookea.me
                  </span>
                  {businessName ? (
                    <span className="text-xs text-muted-foreground truncate">
                      {businessName}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50 truncate">
                      Sin negocio configurado
                    </span>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent className="gap-0 pt-2">
        <NavMain items={menuDataOptions.navMain} />
        <SidebarSeparator className="my-2 mx-4 bg-sidebar-border/60" />
        <NavSecondary items={menuDataOptions.navSecondary} className="mt-0" />
      </SidebarContent>

      {/* ── User footer ── */}
      <SidebarFooter className="border-t border-sidebar-border/60 pt-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
