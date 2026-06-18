import { apiClient } from "./client";
import type { CreateScheduleRequest, SchedulesListResponse } from "./types";

export const schedulesApi = {
  getByBusiness: (businessId: string) =>
    apiClient.get<SchedulesListResponse>(`/schedules/${businessId}`),

  create: (payload: CreateScheduleRequest) =>
    apiClient.post<SchedulesListResponse>("/schedules", payload),

  delete: (id: number) =>
    apiClient.delete<{ success: boolean; message: string }>(`/schedules/${id}`),
};
