"use client";
import { useState, useCallback } from "react";
import DashboardGreeting from "./components/DashboardGreeting";
import CardInformation from "./components/CardInformation";
import DashboardChart from "./components/DashboardChart";
import { useDashboardStats } from "@/hooks/useDashboard";
import { useBusinessStore } from "@/store/business.store";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck, DollarSign, Users } from "lucide-react";
import type { DashboardPeriod } from "@/lib/api/types";

function formatRevenue(amount: number, currency: string) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency || "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function toTrend(growth: number): "up" | "down" | "neutral" {
  if (growth > 0) return "up";
  if (growth < 0) return "down";
  return "neutral";
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm space-y-4">
      <div className="flex justify-between">
        <Skeleton className="size-10 rounded-xl" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-7 w-24" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export default function DashboardPage() {
  const businessId = useBusinessStore(s => s.business?.id ?? "");
  const [period, setPeriod] = useState<DashboardPeriod>(30);

  const { data, isLoading } = useDashboardStats(businessId, period);

  const handlePeriodChange = useCallback((p: DashboardPeriod) => setPeriod(p), []);

  const reservations = data?.reservations;
  const revenue      = data?.revenue;
  const customers    = data?.customers;
  const byStatus     = data?.reservations_by_status;

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">

      {/* Greeting + quick actions */}
      <DashboardGreeting />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <CardInformation
              icon={CalendarCheck}
              title="Reservas del período"
              value={reservations ? String(reservations.current_period) : "—"}
              percent={reservations ? String(Math.abs(reservations.growth_percentage)) : "0"}
              trend={reservations ? toTrend(reservations.growth_percentage) : "neutral"}
              description={reservations?.period_label ?? "Reservas confirmadas en el período."}
            />
            <CardInformation
              icon={DollarSign}
              title="Ingresos estimados"
              value={revenue ? formatRevenue(revenue.current_month, revenue.currency) : "—"}
              percent={revenue ? String(Math.abs(revenue.growth_percentage)) : "0"}
              trend={revenue ? toTrend(revenue.growth_percentage) : "neutral"}
              description={revenue?.period_label ?? "Mes calendario actual vs anterior."}
            />
            <CardInformation
              icon={Users}
              title="Clientes atendidos"
              value={customers ? String(customers.current_period) : "—"}
              percent={customers ? String(Math.abs(customers.growth_percentage)) : "0"}
              trend={customers ? toTrend(customers.growth_percentage) : "neutral"}
              description={customers?.period_label ?? "Clientes únicos en el período."}
            />
          </>
        )}
      </div>

      {/* Chart */}
      <div className="w-full max-w-7xl">
        <DashboardChart
          period={period}
          onPeriodChange={handlePeriodChange}
          byStatus={byStatus}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
