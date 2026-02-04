import { request } from '@/service/request'

// --- Mock Data Constants ---

const MOCK_STATS: Api.Dashboard.Stats = {
  todayNewCustomers: 5,
  monthNewProjects: 23,
  pendingProjects: 12,
  monthContractAmount: 158000.0
}

const MOCK_WARNINGS: Api.Dashboard.Warnings = {
  timeoutProjects: [
    {
      id: 1001,
      projectName: '翠湖花园A栋装修',
      partyName: '张三',
      phase: '已测量',
      days: 15
    },
    {
      id: 1002,
      projectName: '万科城别墅',
      partyName: '李四',
      phase: '已报价',
      days: 10
    }
  ],
  inactiveCustomers: [
    {
      id: 1003,
      projectName: '保利国际公寓',
      partyName: '王五',
      phase: '已测量',
      days: 20
    },
    {
      id: 1004,
      projectName: '绿地中心写字楼',
      partyName: '赵六',
      phase: '已报价',
      days: 18
    }
  ]
}

const MOCK_EVENTS: Api.Dashboard.EventItem[] = [
  {
    id: 1,
    eventType: 'PROJECT_PHASE_CHANGE',
    targetName: '翠湖花园A栋装修',
    relatedName: '张三',
    oldValue: '已测量',
    newValue: '已报价',
    timeLabel: '刚刚'
  },
  {
    id: 2,
    eventType: 'NEW_CUSTOMER',
    targetName: '李四',
    relatedName: null,
    oldValue: null,
    newValue: null,
    timeLabel: '30分钟前'
  },
  {
    id: 3,
    eventType: 'PROJECT_PHASE_CHANGE',
    targetName: '万科城别墅',
    relatedName: '王五',
    oldValue: '已报价',
    newValue: '已签合同',
    timeLabel: '2小时前'
  },
  {
    id: 4,
    eventType: 'NEW_REFERRAL',
    targetName: '赵六',
    relatedName: '设计师小陈',
    oldValue: null,
    newValue: null,
    timeLabel: '1天前'
  },
  {
    id: 5,
    eventType: 'PROJECT_PHASE_CHANGE',
    targetName: '保利国际公寓',
    relatedName: '钱七',
    oldValue: '已测量',
    newValue: '已报价',
    timeLabel: '3天前'
  },
  {
    id: 6,
    eventType: 'NEW_CUSTOMER',
    targetName: '孙八',
    relatedName: null,
    oldValue: null,
    newValue: null,
    timeLabel: '7天前'
  }
]

const MOCK_WEEKLY_TREND: Api.Dashboard.WeeklyTrend = {
  weeks: [
    {
      weekLabel: '第1周',
      startDate: '01/01',
      amount: 50000.0
    },
    {
      weekLabel: '第2周',
      startDate: '01/08',
      amount: 80000.0
    },
    {
      weekLabel: '第3周',
      startDate: '01/15',
      amount: 65000.0
    },
    {
      weekLabel: '第4周',
      startDate: '01/22',
      amount: 120000.0
    }
  ],
  totalAmount: 315000.0
}

// --- API Functions with Mock Fallback ---

/** Get dashboard stats */
export async function fetchGetDashboardStats() {
  try {
    const result = await request<Api.Dashboard.Stats>({
      url: '/dashboard/stats',
      method: 'get'
    })

    if (result.error || !result.data) {
      return { data: MOCK_STATS, error: null }
    }
    return result
  } catch {
    return { data: MOCK_STATS, error: null }
  }
}

/** Get dashboard warnings */
export async function fetchGetDashboardWarnings() {
  try {
    const result = await request<Api.Dashboard.Warnings>({
      url: '/dashboard/warnings',
      method: 'get'
    })

    if (result.error || !result.data) {
      return { data: MOCK_WARNINGS, error: null }
    }
    return result
  } catch {
    return { data: MOCK_WARNINGS, error: null }
  }
}

/** Get dashboard events */
export async function fetchGetDashboardEvents() {
  try {
    const result = await request<Api.Dashboard.EventItem[]>({
      url: '/dashboard/events',
      method: 'get'
    })

    if (result.error || !result.data || result.data.length === 0) {
      return { data: MOCK_EVENTS, error: null }
    }
    return result
  } catch {
    return { data: MOCK_EVENTS, error: null }
  }
}

/** Get dashboard weekly trend */
export async function fetchGetDashboardWeeklyTrend() {
  try {
    const result = await request<Api.Dashboard.WeeklyTrend>({
      url: '/dashboard/weekly-trend',
      method: 'get'
    })

    if (result.error || !result.data) {
      return { data: MOCK_WEEKLY_TREND, error: null }
    }
    return result
  } catch {
    return { data: MOCK_WEEKLY_TREND, error: null }
  }
}
