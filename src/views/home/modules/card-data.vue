<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fetchGetDashboardStats } from '@/service/api/dashboard'

defineOptions({
  name: 'CardData'
})

interface CardData {
  key: string
  title: string
  value: number
  unit: string
  icon: string
  decimals?: number
}

const stats = ref<Api.Dashboard.Stats | null>(null)

const cardData = computed<CardData[]>(() => {
  if (!stats.value) return []

  return [
    {
      key: 'newCustomers',
      title: '今日新增客户',
      value: Number(stats.value.todayNewCustomers),
      unit: '',
      icon: 'ant-design:user-add-outlined'
    },
    {
      key: 'newProjects',
      title: '本月新增项目',
      value: Number(stats.value.monthNewProjects),
      unit: '',
      icon: 'ant-design:project-outlined'
    },
    {
      key: 'pendingProjects',
      title: '待跟进项目',
      value: Number(stats.value.pendingProjects),
      unit: '',
      icon: 'ant-design:clock-circle-outlined'
    },
    {
      key: 'turnover',
      title: '本月完成金额',
      value: Number(stats.value.monthContractAmount),
      unit: '¥',
      icon: 'ant-design:money-collect-outlined',
      decimals: 2
    }
  ]
})

async function getData() {
  const { data, error } = await fetchGetDashboardStats()
  if (!error && data) {
    stats.value = data
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
  <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="24" :y-gap="24">
    <NGi v-for="item in cardData" :key="item.key">
      <div
        class="card-box flex-col-center border border-gray-200 rounded-8px bg-white p-16px dark:border-gray-700 dark:bg-dark"
      >
        <div class="mb-12px w-full flex-y-center justify-between">
          <h3 class="text-14px text-gray-500 font-medium">{{ item.title }}</h3>
          <SvgIcon :icon="item.icon" class="text-20px text-black dark:text-white" />
        </div>
        <div class="w-full flex-y-center items-baseline">
          <span v-if="item.unit" class="mr-4px text-16px font-bold">{{ item.unit }}</span>
          <CountTo
            :start-value="0"
            :end-value="item.value"
            :decimals="item.decimals || 0"
            class="text-32px text-black font-bold dark:text-white"
          />
        </div>
      </div>
    </NGi>
  </NGrid>
</template>

<style scoped>
.card-box {
  transition: all 0.3s ease-in-out;
}
.card-box:hover {
  border-color: #000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
