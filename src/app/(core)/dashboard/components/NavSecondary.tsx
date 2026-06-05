"use client";
// Dependencies
import * as React from "react";
// Components
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// Hooks
import { usePathname } from "next/navigation";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname.startsWith(url);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-widest px-2 mb-1">
        Configuración
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {items.map(item => {
            const Icon = item.icon;
            const active = isActive(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={active}
                  asChild
                  className={
                    active
                      ? "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <div className={`flex size-6 shrink-0 items-center justify-center rounded-md transition-colors ${
                      active ? "bg-primary/15" : "bg-transparent"
                    }`}>
                      <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
