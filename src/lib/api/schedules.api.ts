import { apiClient } from "./client";
import type { CreateScheduleRequest, SchedulesListResponse, SlotsMonthResponse } from "./types";

export const schedulesApi = {
  getByBusiness: (businessId: string) =>
    apiClient.get<SchedulesListResponse>(`/schedules/${businessId}`),

  getSlotsByMonth: (businessId: string, date: string) =>
    apiClient.get<SlotsMonthResponse>(
      `/schedules/${businessId}/slots/month?date=${date}`,
    ),

  create: (payload: CreateScheduleRequest) =>
    apiClient.post<SchedulesListResponse>("/schedules", payload),

  delete: (id: number) =>
    apiClient.delete<{ success: boolean; message: string }>(`/schedules/${id}`),
};
