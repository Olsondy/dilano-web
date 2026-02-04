<script setup lang="ts">
import { watch } from 'vue'
import { fetchGetDashboardWeeklyTrend } from '@/service/api/dashboard'
import { useAppStore } from '@/store/modules/app'
import { useEcharts } from '@/hooks/common/echarts'

defineOptions({
  name: 'LineChart'
})

const appStore = useAppStore()

const { domRef, updateOptions } = useEcharts(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['签约金额']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [] as string[]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      color: '#8e9dff',
      name: '签约金额',
      type: 'bar',
      barMaxWidth: 60,
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#8e9dff'
            },
            {
              offset: 1,
              color: 'rgba(142, 157, 255, 0.2)'
            }
          ]
        }
      },
      data: [] as number[]
    },
    {
      color: '#5e7ce0',
      name: '签约金额',
      type: 'line',
      smooth: true,
      tooltip: {
        show: false
      },
      data: [] as number[]
    }
  ]
}))

async function getData() {
  const { data, error } = await fetchGetDashboardWeeklyTrend()
  if (!error && data) {
    updateOptions(opts => {
      opts.xAxis.data = data.weeks.map(w => `${w.weekLabel} (${w.startDate})`)
      opts.series[0].data = data.weeks.map(w => w.amount)
      opts.series[1].data = data.weeks.map(w => w.amount)
      return opts
    })
  }
}

function updateLocale() {
  updateOptions((opts, factory) => {
    const originOpts = factory()
    opts.legend.data = originOpts.legend.data
    return opts
  })
}

async function init() {
  getData()
}

watch(
  () => appStore.locale,
  () => {
    updateLocale()
  }
)

// init
init()
</script>

<template>
  <div ref="domRef" class="h-full w-full"></div>
</template>

<style scoped></style>
