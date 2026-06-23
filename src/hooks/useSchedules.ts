"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schedulesApi } from "@/lib/api/schedules.api";
import type { CreateScheduleRequest } from "@/lib/api/types";
import { toast } from "sonner";

export const scheduleKeys = {
  byBusiness: (businessId: string) => ["schedules", businessId] as const,
  slotsByMonth: (businessId: string, month: string) =>
    ["schedules", businessId, "slots", month] as const,
};

export function useDeleteSchedule(businessId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => schedulesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.byBusiness(businessId),
      });
      toast.success("Horario eliminado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo eliminar el horario. Inténtalo de nuevo.");
    },
  });
}

export function useCreateSchedule(businessId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateScheduleRequest) => schedulesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.byBusiness(businessId),
      });
      toast.success("Horario guardado correctamente.");
    },
    onError: () => {
      toast.error("No se pudo guardar el horario. Inténtalo de nuevo.");
    },
  });
}

function toMonthDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
}

// GET /schedules/:businessId/slots/month?date=YYYY-MM-DD
export function useMonthSlots(businessId: string, date?: Date) {
  const monthStr = toMonthDateStr(date ?? new Date());

  return useQuery({
    queryKey: scheduleKeys.slotsByMonth(businessId, monthStr),
    queryFn: () => schedulesApi.getSlotsByMonth(businessId, monthStr),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5,
    select: (res) => ({
      success: res.success,
      message: res.message,
      data: { slots: res.data?.slots ?? [] },
    }),
  });
}
