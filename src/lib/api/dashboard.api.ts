import { apiClient } from "./client";
import type { DashboardPeriod, DashboardResponse } from "./types";

export const dashboardApi = {
  getStats: (businessId: string, period: DashboardPeriod = 30) =>
    apiClient.get<DashboardResponse>(
      `/dashboard/${businessId}?period=${period}`,
    ),
};
