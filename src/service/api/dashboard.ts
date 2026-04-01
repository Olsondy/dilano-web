import { request } from '@/service/request'

// --- API Functions ---

/** Get dashboard stats */
export async function fetchGetDashboardStats() {
  return request<Api.Dashboard.Stats>({
    url: '/dashboard/stats',
    method: 'get'
  })
}

/** Get dashboard warnings */
export async function fetchGetDashboardWarnings() {
  return request<Api.Dashboard.Warnings>({
    url: '/dashboard/warnings',
    method: 'get'
  })
}

/** Get dashboard events */
export async function fetchGetDashboardEvents() {
  return request<Api.Dashboard.EventItem[]>({
    url: '/dashboard/events',
    method: 'get'
  })
}

/** Get dashboard weekly trend */
export async function fetchGetDashboardWeeklyTrend() {
  return request<Api.Dashboard.WeeklyTrend>({
    url: '/dashboard/weekly-trend',
    method: 'get'
  })
}
