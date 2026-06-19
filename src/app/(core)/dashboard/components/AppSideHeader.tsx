"use client";
// Components
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
// Hooks
import { usePathname } from "next/navigation";
// Icons
import {
  BookCheck,
  Building2,
  CalendarCheck,
  LayoutDashboard,
  Package,
  UserCircle,
  type LucideIcon,
} from "lucide-react";

const ROUTE_META: Record<string, { label: string; icon: LucideIcon }> = {
  "/dashboard": { label: "Dashboard", icon: LayoutDashboard },
  "/dashboard/reservations": { label: "Reservas", icon: CalendarCheck },
  "/dashboard/schedules": { label: "Horarios", icon: BookCheck },
  "/dashboard/products": { label: "Servicios", icon: Package },
  "/dashboard/business": { label: "Mi Negocio", icon: Building2 },
  "/dashboard/profile": { label: "Mi Perfil", icon: UserCircle },
};

function getCurrentRoute(pathname: string) {
  // Try exact match first, then prefix match from longest to shortest
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  const match = Object.keys(ROUTE_META)
    .filter(k => k !== "/dashboard" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? ROUTE_META[match] : ROUTE_META["/dashboard"];
}

export function SiteHeader() {
  const pathname = usePathname();
  const route = getCurrentRoute(pathname);
  const Icon = route.icon;

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/95 backdrop-blur-sm transition-all ease-linear sticky top-0 z-10">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="mx-1.5 h-4 bg-border/60" />

        {/* Current route indicator */}
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
            <Icon className="size-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {route.label}
          </span>
        </div>
      </div>
    </header>
  );
}
