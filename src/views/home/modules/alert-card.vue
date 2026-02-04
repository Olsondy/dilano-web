<script setup lang="ts">
import { defineOptions, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchGetDashboardWarnings } from '@/service/api/dashboard'

defineOptions({
  name: 'AlertCard'
})

const router = useRouter()

interface AlertItem {
  id: string | number
  partyName: string
  projectName: string
  days: number
  type: 'info' | 'success' | 'warning' | 'error'
}

const items = ref<AlertItem[]>([])

async function getData() {
  const { data, error } = await fetchGetDashboardWarnings()
  if (!error && data) {
    const alerts: AlertItem[] = []

    // Process Timeout Projects
    if (data.timeoutProjects) {
      data.timeoutProjects.forEach(p => {
        alerts.push({
          id: `tp-${p.id}`,
          partyName: p.partyName,
          projectName: p.projectName,
          days: p.days,
          type: 'error'
        })
      })
    }

    // Process Inactive Customers
    if (data.inactiveCustomers) {
      data.inactiveCustomers.forEach(c => {
        alerts.push({
          id: `ic-${c.id}`,
          partyName: c.partyName,
          projectName: c.projectName,
          days: c.days,
          type: 'warning'
        })
      })
    }

    items.value = alerts
  }
}

function handleToCustomer(partyName: string) {
  router.push({
    path: '/customer/info',
    query: { partyName }
  })
}

function handleToProject(projectName: string) {
  router.push({
    path: '/project/info',
    query: { projectName }
  })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <NCard title="预警提醒" :bordered="false" size="small" segmented class="h-full card-wrapper">
    <div class="h-full flex flex-col gap-8px overflow-y-auto py-8px pr-2px">
      <div
        v-for="item in items"
        :key="item.id"
        class="group relative flex items-center justify-between border border-gray-100 rounded-6px bg-gray-50/50 px-12px py-10px transition-all dark:border-gray-700 dark:bg-white/5 hover:bg-white hover:shadow-sm dark:hover:bg-white/10"
      >
        <!-- Left: Indicator & Content -->
        <div class="flex items-center gap-12px">
          <!-- Breathing Light -->
          <div class="relative ml-4px h-2.5 w-2.5 flex flex-shrink-0">
            <span
              class="absolute h-full w-full inline-flex animate-ping rounded-full opacity-75"
              :class="item.type === 'error' ? 'bg-red-400' : 'bg-orange-400'"
            ></span>
            <span
              class="relative h-2.5 w-2.5 inline-flex rounded-full"
              :class="item.type === 'error' ? 'bg-red-500' : 'bg-orange-500'"
            ></span>
          </div>

          <div class="flex-y-center flex-1 gap-4px overflow-hidden truncate text-13px text-gray-700 dark:text-gray-200">
            <span class="shrink-0 font-medium">
              <NText class="cursor-pointer underline" @click.stop="handleToCustomer(item.partyName)">
                {{ item.partyName }}
              </NText>
            </span>
            <span class="shrink-0 font-medium">
              客户的
              <NButton
                strong
                secondary
                size="tiny"
                class="cursor-pointer"
                @click.stop="handleToProject(item.projectName)"
              >
                {{ item.projectName }}
              </NButton>
              项目
            </span>
            <NTag
              :type="item.type === 'error' ? 'error' : 'warning'"
              size="small"
              :bordered="false"
              class="h-20px shrink-0 px-4px"
            >
              超时{{ item.days }}天
            </NTag>
            <span class="shrink-0">, 运营人员请留意!</span>
          </div>
        </div>
      </div>

      <NEmpty v-if="items.length === 0" description="暂无预警" />
    </div>
  </NCard>
</template>

<style scoped></style>
