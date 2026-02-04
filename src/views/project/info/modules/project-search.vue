<script setup lang="ts">
import { ref } from 'vue'
import { useNaiveForm } from '@/hooks/common/form'
import { $t } from '@/locales'

defineOptions({
  name: 'ProjectSearch'
})

interface Emits {
  (e: 'reset'): void
  (e: 'search'): void
}

const emit = defineEmits<Emits>()

const { formRef, validate, restoreValidation } = useNaiveForm()
const dateRangeOperTime = ref<[string, string] | null>(null)

const model = defineModel<Api.Business.ProjectSearchParams>('model', { required: true })

function onDateRangeOperTimeUpdate(value: [string, string] | null) {
  if (value?.length) {
    model.value.params!.beginTime = value[0]
    model.value.params!.endTime = value[1]
  }
}

async function reset() {
  dateRangeOperTime.value = null
  Object.assign(model.value.params!, {})
  await restoreValidation()
  emit('reset')
}

async function search() {
  await validate()
  emit('search')
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="项目名" path="projectName" class="pr-24px">
              <NInput v-model:value="model.projectName" placeholder="请输入项目名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="石材类型" path="stoneType" class="pr-24px">
              <DictSelect
                v-model:value="model.stoneTypeList"
                :placeholder="$t('请选择石材类型')"
                dict-code="business_project_stones"
                multiple
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('项目进度')" path="status" class="pr-24px">
              <DictSelect
                v-model:value="model.projectPhase"
                :placeholder="$t('请选择项目进度')"
                dict-code="business_project_phase"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('进度状态')" path="status" class="pr-24px">
              <DictSelect
                v-model:value="model.phaseTimeout"
                :placeholder="$t('请选择进度状态')"
                dict-code="business_project_phase_timeout"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" label="创建时间" path="operTime" class="pr-24px">
              <NDatePicker
                v-model:formatted-value="dateRangeOperTime"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                clearable
                @update:formatted-value="onDateRangeOperTimeUpdate"
              />
            </NFormItemGi>
            <NFormItemGi span="24" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
