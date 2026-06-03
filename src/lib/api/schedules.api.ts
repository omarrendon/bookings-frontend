import { apiClient } from "./client";
import type { MonthSlotsResponse } from "./types";

export const schedulesApi = {
  getMonthSlots: (businessId: string, date: string) =>
    apiClient.get<MonthSlotsResponse>(
      `/schedules/${businessId}`,
    ),
};
