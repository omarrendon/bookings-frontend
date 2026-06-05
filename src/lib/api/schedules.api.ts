import { apiClient } from "./client";
import type { SchedulesListResponse } from "./types";

export const schedulesApi = {
  getByBusiness: (businessId: string) =>
    apiClient.get<SchedulesListResponse>(`/schedules/${businessId}`),
};
