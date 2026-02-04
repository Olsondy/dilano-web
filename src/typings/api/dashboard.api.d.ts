/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Dashboard {
    /** 统计卡片数据 */
    interface Stats {
      todayNewCustomers: number
      monthNewProjects: number
      pendingProjects: number
      monthContractAmount: number
    }

    interface WarningItem {
      id: number
      projectName: string
      partyName: string
      phase: string
      days: number
    }

    /** 预警提醒数据 */
    interface Warnings {
      timeoutProjects: WarningItem[]
      inactiveCustomers: WarningItem[]
    }

    /** 动态事件数据 */
    interface EventItem {
      id: number
      eventType: 'PROJECT_PHASE_CHANGE' | 'NEW_CUSTOMER' | 'NEW_REFERRAL' | string
      targetName: string
      relatedName: string | null
      oldValue: string | null
      newValue: string | null
      timeLabel: string
    }

    /** 周签约趋势项 */
    interface WeeklyTrendItem {
      weekLabel: string
      startDate: string
      amount: number
    }

    /** 周签约趋势数据 */
    interface WeeklyTrend {
      weeks: WeeklyTrendItem[]
      totalAmount: number
    }
  }
}
