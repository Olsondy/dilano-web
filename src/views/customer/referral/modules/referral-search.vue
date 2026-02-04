<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form'
import { $t } from '@/locales'

defineOptions({
  name: 'ReferralSearch'
})

interface Emits {
  (e: 'reset'): void
  (e: 'search'): void
}

const emit = defineEmits<Emits>()

const { formRef, validate, restoreValidation } = useNaiveForm()

const model = defineModel<Api.Business.ReferralSearchParams>('model', { required: true })

async function reset() {
  await restoreValidation()
  emit('reset')
}

async function search() {
  await validate()
  emit('search')
}
</script>

<template>
  <NCard :bordered="false" size="small" class="table-search card-wrapper">
    <NCollapse :default-expanded-names="['referral-search']">
      <NCollapseItem :title="$t('common.search')" name="referral-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="90">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="客户名称" path="customerName" class="pr-24px">
              <NInput v-model:value="model.customerName" placeholder="请输入客户名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="客户手机号" path="customerPhoneNumber" class="pr-24px">
              <NInput v-model:value="model.customerPhoneNumber" placeholder="请输入客户手机号" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="项目名称" path="projectName" class="pr-24px">
              <NInput v-model:value="model.projectName" placeholder="请输入项目名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="推荐人名称" path="referralName" class="pr-24px">
              <NInput v-model:value="model.referralName" placeholder="请输入推荐人" />
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
