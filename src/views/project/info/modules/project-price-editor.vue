<script setup lang="ts">
import { ref, watch } from 'vue'
import { NButton, NInputNumber, NPopover } from 'naive-ui'
import { fetchUpdateProjectPrice } from '@/service/api/business/project'
import { formatCurrency } from '@/utils/common'

interface Props {
  row: Api.Business.Project
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update'): void
}>()

const visible = ref(false)
const price = ref<number | null>(0)
const loading = ref(false)

function init() {
  price.value = Number(props.row.quotedPrice) || 0
}

watch(visible, val => {
  if (val) init()
})

async function handleSave() {
  if (price.value === null) return

  loading.value = true
  const { error } = await fetchUpdateProjectPrice(props.row.id, price.value)
  loading.value = false

  if (!error) {
    window.$message?.success('报价更新成功')
    visible.value = false
    emit('update')
  }
}
</script>

<template>
  <div class="group flex-center gap-4px">
    <span class="hover:text-primary-active cursor-pointer text-primary font-bold transition-colors">
      {{ formatCurrency(Number(row.quotedPrice)) }}
    </span>

    <NPopover v-model:show="visible" trigger="click" placement="bottom">
      <template #trigger>
        <div
          class="cursor-pointer p-2px text-primary opacity-40 transition-all group-hover:opacity-80 hover:opacity-100"
        >
          <icon-material-symbols:edit-square-outline class="text-16px" />
        </div>
      </template>

      <div class="flex gap-8px p-4px">
        <NInputNumber
          v-model:value="price"
          size="small"
          :precision="2"
          :show-button="false"
          placeholder="输入金额"
          class="w-120px"
          @keyup.enter="handleSave"
        />
        <NButton type="primary" size="small" :loading="loading" :disabled="loading" @click="handleSave">保存</NButton>
        <NButton size="small" @click="visible = false">取消</NButton>
      </div>
    </NPopover>
  </div>
</template>
