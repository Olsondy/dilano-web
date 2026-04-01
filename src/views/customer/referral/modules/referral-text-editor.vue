<script setup lang="ts">
import { ref, watch } from 'vue'
import { NButton, NInput, NPopover, NSpin } from 'naive-ui'
import { fetchUpdateReferral } from '@/service/api/business/referral'

defineOptions({
  name: 'ReferralTextEditor'
})

interface Props {
  row: Api.Business.Referral
  field: 'referralChannel' | 'remarks'
  label: string
  type?: 'text' | 'textarea'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  (e: 'update'): void
}>()

const visible = ref(false)
const value = ref('')
const loading = ref(false)

function init() {
  value.value = props.row[props.field] || ''
}

watch(visible, val => {
  if (val) init()
})

async function handleSave() {
  loading.value = true
  const { error } = await fetchUpdateReferral({
    id: props.row.id,
    [props.field]: value.value
  })
  loading.value = false

  if (!error) {
    window.$message?.success(`${props.label}更新成功`)
    visible.value = false
    emit('update')
  }
}
</script>

<template>
  <div class="group flex-center justify-center gap-4px">
    <span class="max-w-full truncate">
      {{ row[field] || '--' }}
    </span>

    <NPopover v-model:show="visible" trigger="click" placement="bottom" :width="field === 'remarks' ? 300 : 240">
      <template #trigger>
        <div class="cursor-pointer p-2px text-primary opacity-0 transition-all hover:scale-110 group-hover:opacity-100">
          <icon-material-symbols:edit-square-outline-rounded class="text-14px" />
        </div>
      </template>

      <NSpin :show="loading">
        <div class="flex-col gap-12px p-4px">
          <div class="mb-4px text-center text-12px text-gray-400 font-bold">编辑{{ label }}</div>
          <NInput
            v-model:value="value"
            size="small"
            :type="type"
            :placeholder="'请输入' + label"
            :rows="type === 'textarea' ? 4 : 1"
            :maxlength="field === 'remarks' ? 500 : 50"
            show-count
            @keyup.enter="type === 'text' && handleSave()"
          />
          <div class="mt-4px flex justify-end gap-8px">
            <NButton size="tiny" @click="visible = false">取消</NButton>
            <NButton type="primary" size="tiny" :loading="loading" @click="handleSave">确认</NButton>
          </div>
        </div>
      </NSpin>
    </NPopover>
  </div>
</template>

<style scoped></style>
