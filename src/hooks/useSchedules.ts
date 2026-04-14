"use client";

import { useQuery } from "@tanstack/react-query";
import { schedulesApi } from "@/lib/api/schedules.api";

export const scheduleKeys = {
  monthSlots: (businessId: string, date: string) =>
    ["schedules", businessId, "slots", date] as const,
};

export function useMonthSlots(businessId: string, date: Date) {
  // Primer día del mes en formato YYYY-MM-DD usando partes locales para evitar offset UTC
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const dateParam = `${y}-${m}-01`;

  return useQuery({
    queryKey: scheduleKeys.monthSlots(businessId, dateParam),
    queryFn: () => schedulesApi.getMonthSlots(businessId, dateParam),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5, // 5 min — los slots de un mes no cambian frecuentemente
  });
}
