<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { SelectProps } from 'naive-ui'
import { useDict } from '@/hooks/business/dict'

defineOptions({ name: 'DictSelect' })

interface Props {
  dictCode: string
  immediate?: boolean
  multiple?: boolean
  disabledOptions?: string[]
  [key: string]: any
}

const props = withDefaults(defineProps<Props>(), {
  immediate: false,
  multiple: false,
  disabledOptions: () => []
})

const value = defineModel<string | string[] | null>('value', { required: false })

const attrs: SelectProps = useAttrs()
const { options } = useDict(props.dictCode, props.immediate)

const filteredOptions = computed(() => {
  if (!props.disabledOptions.length) return options.value
  return options.value.map(opt => ({
    ...opt,
    disabled: props.disabledOptions.includes(opt.value as string)
  }))
})
</script>

<template>
  <NSelect
    v-model:value="value"
    :multiple="multiple"
    :loading="!options.length"
    :options="filteredOptions"
    :clear-filter-after-select="false"
    v-bind="attrs"
  />
</template>

<style scoped></style>
