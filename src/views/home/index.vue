<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fetchGetDashboardEvents } from '@/service/api/dashboard'
import { useAppStore } from '@/store/modules/app'
import HeaderBanner from './modules/header-banner.vue'
import CardData from './modules/card-data.vue'
import LineChart from './modules/line-chart.vue'
import NewsVerticalTicker from './modules/news-vertical-ticker.vue'
import AlertCard from './modules/alert-card.vue'

const appStore = useAppStore()
interface NewsItem {
  id: string
  content: string
  timeLabel: string
  eventType: string
  relatedName?: string
  targetName?: string
  oldValue?: string
  newValue?: string
}
const gap = computed(() => (appStore.isMobile ? 0 : 24))
const newses = ref<NewsItem[]>([])

async function getEvents() {
  const { data, error } = await fetchGetDashboardEvents()
  if (!error && data && Array.isArray(data)) {
    newses.value = data.map(item => {
      let content = ''
      switch (item.eventType) {
        case 'PROJECT_PHASE_CHANGE':
          content = `${item.relatedName} 客户的 ${item.targetName} 项目 从 ${item.oldValue} 阶段变更为 ${item.newValue}`
          break
        case 'NEW_CUSTOMER':
          content = `新增 ${item.targetName} 客户/推荐人信息`
          break
        case 'NEW_REFERRAL':
          content = `推荐人 ${item.relatedName} 报备了新客户 ${item.targetName}`
          break
        default:
          content = `项目 ${item.targetName} 有新动态`
      }
      return {
        id: String(item.id),
        content,
        timeLabel: item.timeLabel,
        eventType: item.eventType,
        relatedName: item.relatedName || undefined,
        targetName: item.targetName || undefined,
        oldValue: item.oldValue || undefined,
        newValue: item.newValue || undefined
      }
    })
  }
}

onMounted(() => {
  getEvents()
})
</script>

<template>
  <NSpace vertical :size="24">
    <HeaderBanner />

    <!-- A 区域：统计卡片 -->
    <CardData />

    <NGrid :x-gap="gap" :y-gap="24" responsive="screen" item-responsive>
      <!-- 左侧区域：预警 + 动态列表 -->
      <NGi span="24 s:24 m:8">
        <div class="left-column">
          <!-- B 区域：预警提醒 -->
          <AlertCard class="alert-section" />
          <!-- C 区域：动态滚动列表 -->
          <div class="news-section">
            <NewsVerticalTicker :items="newses" :visible-count="10" :item-height="60">
              <template #default="{ item }">
                <span v-if="item.eventType === 'PROJECT_PHASE_CHANGE'">
                  <span class="text-primary font-bold">{{ item.relatedName }}</span>
                  客户的
                  <span class="text-primary font-bold">{{ item.targetName }}</span>
                  项目 从
                  <span class="text-slate-500">{{ item.oldValue }}</span>
                  阶段变更为
                  <span
                    class="font-bold"
                    :class="['已签约', '项目结束'].includes(item.newValue || '') ? 'text-success' : 'text-primary'"
                  >
                    {{ item.newValue }}
                  </span>
                </span>
                <span v-else-if="item.eventType === 'NEW_CUSTOMER'">
                  新增
                  <span class="text-primary font-bold">{{ item.targetName }}</span>
                  客户/推荐人信息
                </span>
                <span v-else-if="item.eventType === 'NEW_REFERRAL'">
                  推荐人
                  <span class="text-primary font-bold">{{ item.relatedName }}</span>
                  报备了新客户
                  <span class="text-primary font-bold">{{ item.targetName }}</span>
                </span>
                <span v-else>
                  项目
                  <span class="text-primary font-bold">{{ item.targetName }}</span>
                  有新动态
                </span>
              </template>
            </NewsVerticalTicker>
          </div>
        </div>
      </NGi>

      <!-- 右侧区域：可视化图表 -->
      <NGi span="24 s:24 m:16">
        <div class="right-column">
          <NCard :bordered="false" class="chart-card card-wrapper" title="项目签约金额趋势 (周)">
            <div class="chart-content">
              <LineChart />
            </div>
          </NCard>
        </div>
      </NGi>
    </NGrid>
  </NSpace>
</template>

<style scoped>
/* 左右两列使用相同高度 */
.left-column,
.right-column {
  height: calc(100vh - 450px);
  min-height: 600px;
  max-height: 800px;
}

/* 左侧列：使用 flex 布局 */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 预警区域：固定高度，显示4条内容 */
.alert-section {
  height: 280px;
  flex-shrink: 0;
  overflow: hidden;
}

/* 动态列表区域：占据剩余空间 */
.news-section {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* 右侧图表卡片 */
.chart-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-card :deep(.n-card__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-content {
  flex: 1;
  min-height: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .left-column,
  .right-column {
    height: auto;
    min-height: 600px;
  }
}
</style>
