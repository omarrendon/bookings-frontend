"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard.api";
import type { DashboardPeriod } from "@/lib/api/types";

export const dashboardKeys = {
  stats: (businessId: string, period: DashboardPeriod) =>
    ["dashboard", businessId, period] as const,
};

export function useDashboardStats(businessId: string, period: DashboardPeriod) {
  return useQuery({
    queryKey: dashboardKeys.stats(businessId, period),
    queryFn: () => dashboardApi.getStats(businessId, period),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5,
    select: res => res.data,
  });
}
