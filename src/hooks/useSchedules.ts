"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schedulesApi } from "@/lib/api/schedules.api";
import type { CreateScheduleRequest, DaySlots, Schedule } from "@/lib/api/types";
import { toast } from "sonner";

export const scheduleKeys = {
  byBusiness: (businessId: string) => ["schedules", businessId] as const,
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function expandScheduleToSlots(s: Schedule) {
  const open = timeToMinutes(s.open_time);
  const close = timeToMinutes(s.close_time);
  const dur = s.slot_duration_minutes;
  const slots = [];
  for (let t = open; t + dur <= close; t += dur) {
    slots.push({ start: toHHMM(t), end: toHHMM(t + dur), isBooked: false, scheduleId: s.id });
  }
  return slots;
}

// Transforms Schedule[] (raw API) → DaySlots[] (used by calendar/picker components)
function toDaySlots(schedules: Schedule[]): DaySlots[] {
  const map: Record<string, DaySlots> = {};
  for (const s of schedules) {
    if (!map[s.date]) map[s.date] = { date: s.date, slots: [] };
    map[s.date].slots.push(...expandScheduleToSlots(s));
  }
  for (const day of Object.values(map)) {
    day.slots.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
  }
  return Object.values(map);
}

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

// Keeps data?.data?.slots shape so LayoutSchedules and SchedulePicker need no changes
export function useMonthSlots(businessId: string, _date?: Date) {
  return useQuery({
    queryKey: scheduleKeys.byBusiness(businessId),
    queryFn: () => schedulesApi.getByBusiness(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5,
    select: (res) => ({
      success: res.success,
      message: res.message,
      data: { slots: toDaySlots(res.data ?? []) },
    }),
  });
}
