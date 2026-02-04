<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form'
import { $t } from '@/locales'

defineOptions({
  name: 'CustomerSearch'
})

interface Emits {
  (e: 'reset'): void
  (e: 'search'): void
}

const emit = defineEmits<Emits>()

const model = defineModel<Api.Business.PartySearchParams>('model', { required: true })

const { formRef, validate, restoreValidation } = useNaiveForm()

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
    <NCollapse :default-expanded-names="['customer-search']">
      <NCollapseItem :title="$t('common.search')" name="customer-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="客户名称" path="partyName" class="pr-24px">
              <NInput v-model:value="model.partyName" placeholder="请输入客户名称" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="手机号" path="phoneNumber" class="pr-24px">
              <NInput v-model:value="model.phoneNumber" placeholder="请输入手机号" @keyup.enter="search" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="角色类型" path="partyType" class="pr-24px">
              <NSelect
                v-model:value="model.partyType"
                placeholder="请选择角色类型"
                :options="[
                  { label: '客户', value: 'customer' },
                  { label: '推荐人', value: 'referral' }
                ]"
                clearable
                @update:value="search"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="创建时间" path="createTime" class="pr-24px">
              <NDatePicker
                v-model:formatted-value="model.createTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                clearable
                @update:value="search"
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
