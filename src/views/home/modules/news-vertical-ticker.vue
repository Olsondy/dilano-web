<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { NCard, NEmpty, NList, NListItem } from 'naive-ui'

interface NewsItem {
  id: string
  content: string
  timeLabel: string
  [key: string]: any
}
/**
 * Props
 * - items: 要展示的数据数组（string | number | any — 组件默认把 item 当文本渲染，复杂渲染可用 slot）
 * - visibleCount: 默认可见条数（默认 5）
 * - perItemSeconds: 每项通过视窗所需时间（影响速度）
 * - itemHeight: 可选，指定单项高度（px）。不传则组件会在 mounted 时测量第一个条目的高度
 */
const props = defineProps<{
  items: NewsItem[]
  visibleCount?: number
  perItemSeconds?: number
  itemHeight?: number | null
}>()

const emit = defineEmits<{
  (e: 'measured', height: number): void
}>()

// 默认值
const visibleCount = props.visibleCount ?? 5
const perItemSeconds = props.perItemSeconds ?? 1.6
const providedItemHeight = props.itemHeight ?? null

// DOM refs
const scrollRef = ref<HTMLElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)

// 动态状态
const itemPx = ref<number>(providedItemHeight ?? 75) // 初始备用值，若 providedItemHeight 为 null 则会测量
const paused = ref(false)

// 计算：是否需要滚动（当 items 超过 visibleCount 时滚动）
const needScroll = computed(() => (Array.isArray(props.items) ? props.items.length > visibleCount : false))

// 渲染列表：若需要滚动则复制一次以实现无缝；否则只渲染原数组
const renderList = computed(() => {
  const arr = props.items ?? []
  return needScroll.value ? [...arr, ...arr] : arr
})

// 原始列表的总高度（不乘以 2），动画需要把原始列表整体向上移动这个高度
const originalTotalHeight = computed(() => {
  const n = (props.items ?? []).length
  return Math.round(itemPx.value * n)
})

// 动画时长：每项时长 * 项数（只在需要滚动时生效）
const durationSeconds = computed(() => {
  const n = (props.items ?? []).length
  return Math.max(0.1, perItemSeconds * Math.max(1, n))
})

// scrollStyle 注入到滚动容器：包含 --scroll-distance / --duration，以及 animation-play-state
const scrollStyle = computed(() => {
  if (!needScroll.value || originalTotalHeight.value === 0) {
    return {
      '--scroll-distance': '0px',
      '--duration': '0s',
      'animation-play-state': paused.value ? 'paused' : 'running'
    } as Record<string, string>
  }
  return {
    '--scroll-distance': `${originalTotalHeight.value}px`,
    '--duration': `${durationSeconds.value}s`,
    'animation-play-state': paused.value ? 'paused' : 'running'
  } as Record<string, string>
})

// 用于生成 v-for key：如果是复制后的第二半，idx 会 >= 原始长度
function keyFor(idx: number) {
  // 加个前缀保证唯一性
  return `vt-${idx}`
}

function pause() {
  paused.value = true
}
function play() {
  paused.value = false
}

// 测量第一个条目高度（如果外部没有传 itemHeight）
async function measureIfNeeded() {
  if (providedItemHeight !== null) {
    itemPx.value = providedItemHeight
    return
  }
  await nextTick()
  const el = scrollRef.value
  if (!el) return
  // 第一个 child（注意：若渲染了 duplicated，第一个正好是第一个原始项）
  const first = el.querySelector<HTMLElement>('div')
  if (first) {
    const h = Math.round(first.getBoundingClientRect().height) || 75
    itemPx.value = h
    emit('measured', h)
  } else {
    itemPx.value = 75
  }
}

// 如果 items 变化并且需要滚动，重启动画（通过短暂停止再播放来触发重绘，避免动画卡住）
function restartAnimation() {
  if (!needScroll.value) return
  paused.value = true
  // 使用 requestAnimationFrame 确保浏览器有帧数来切换 play state
  requestAnimationFrame(() => {
    // small delay to force reflow
    requestAnimationFrame(() => {
      paused.value = false
    })
  })
}

// 生命周期
onMounted(async () => {
  await measureIfNeeded()
  // 如果初始就需要滚动，确保动画正常启动
  if (needScroll.value) {
    // 确保浏览器读到新的 CSS 变量
    restartAnimation()
  }
})

onBeforeUnmount(() => {
  // nothing to clean up
})

// 监听 props.items 或外部 itemHeight 的变动
watch(
  () => props.items,
  async () => {
    // 如果 items 数量变了，可能需要测量/调整高度与动画
    await nextTick()
    await measureIfNeeded()
    restartAnimation()
  },
  { deep: true }
)

watch(
  () => props.itemHeight,
  v => {
    if (typeof v === 'number' && v > 0) {
      itemPx.value = v
    } else if (v === null) {
      // 重新测量
      nextTick().then(measureIfNeeded)
    }
  }
)
</script>

<template>
  <NCard title="动态消息" :bordered="false" size="small" segmented class="news-card card-wrapper">
    <div ref="wrapRef" class="news-wrapper" aria-live="polite" @mouseenter="pause" @mouseleave="play">
      <div v-if="!items || items.length === 0" class="h-full flex-center">
        <NEmpty description="暂无动态" />
      </div>
      <!-- 滚动容器：当需要滚动时包含 items 的两倍，用于无缝循环；否则只渲染一次 -->
      <NList
        v-else
        ref="scrollRef"
        class="animate-scroll will-change-transform"
        :class="{ 'is-paused': paused }"
        :style="scrollStyle"
        aria-hidden="false"
      >
        <NListItem
          v-for="(item, idx) in renderList"
          :key="keyFor(idx)"
          class="flex items-center px-4"
          :style="{ height: `${itemPx}px` }"
        >
          <div class="flex-col flex-1 justify-center gap-2px overflow-hidden">
            <div class="text-13px text-gray-700 dark:text-gray-200" :title="item.content">
              <slot :item="item">
                {{ item.content }}
              </slot>
            </div>
            <div class="text-right text-12px text-gray-400">
              {{ item.timeLabel }}
            </div>
          </div>
        </NListItem>
      </NList>
    </div>
  </NCard>
</template>

<style scoped>
.news-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card :deep(.n-card__content) {
  flex: 1;
  padding: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.news-wrapper {
  position: relative;
  overflow: hidden;
  flex: 1;
  min-height: 0;
}

/* 关键帧：把原始列表整体向上移动 totalHeight px（使用变量 --scroll-distance） */
@keyframes vertical-scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(calc(var(--scroll-distance) * -1));
  }
}

/* 滚动容器样式：动画在变量 --duration 下运行 */
.animate-scroll {
  display: block;
  will-change: transform;
  animation: vertical-scroll var(--duration) linear infinite;
}

/* 暂停类（hover 或程序控制） */
.is-paused {
  animation-play-state: paused !important;
}
</style>
