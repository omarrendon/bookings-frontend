"use client";
// Hooks & store
import { useAuthStore } from "@/store/auth.store";
import { useBusinessStore } from "@/store/business.store";
// Components
import { Button } from "@/components/ui/button";
// Icons
import { CalendarPlus, Clock, Package } from "lucide-react";
// Navigation
import Link from "next/link";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function DashboardGreeting() {
  const user = useAuthStore(state => state.user);
  const business = useBusinessStore(state => state.business);

  const greeting = getGreeting();
  const firstName = user?.name ?? "Usuario";
  const businessName = business?.name;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {greeting}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {firstName} 👋
        </h1>
        {businessName && (
          <p className="text-sm text-muted-foreground mt-0.5">
            {businessName}
          </p>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button asChild size="sm" variant="outline" className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/schedules">
            <Clock className="size-3.5" />
            Horarios
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/products">
            <Package className="size-3.5" />
            Servicios
          </Link>
        </Button>
        <Button asChild size="sm" className="gap-2">
          <Link href="/dashboard/reservations">
            <CalendarPlus className="size-3.5" />
            Ver reservas
          </Link>
        </Button>
      </div>
    </div>
  );
}
