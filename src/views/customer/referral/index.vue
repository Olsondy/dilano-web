<script setup lang="tsx">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NCard, NDataTable } from 'naive-ui'
import { fetchGetReferral, fetchGetReferralList } from '@/service/api/business/referral'
import { useAppStore } from '@/store/modules/app'
import { useTable, useTableOperate } from '@/hooks/common/table'
import { useDict } from '@/hooks/business/dict'
import { useAuth } from '@/hooks/business/auth'
import { formatCurrency } from '@/utils/common'
import { $t } from '@/locales'
import ButtonIcon from '@/components/custom/button-icon.vue'
import ReferralSearch from './modules/referral-search.vue'
import ReferralOperateDrawer from './modules/referral-operate-drawer.vue'

defineOptions({
  name: 'ReferralList'
})

// 加载字典
useDict('business_project_stones')
useDict('business_project_phase')

const appStore = useAppStore()
const router = useRouter()
const { hasAuth } = useAuth()
const editingDetail = ref<Api.Business.ReferralDetail | null>(null)

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetReferralList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    customerName: null,
    customerPhoneNumber: null,
    projectName: null,
    referralName: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'customerName',
      title: '客户名称',
      align: 'center',
      minWidth: 100
    },
    {
      key: 'customerPhoneNumber',
      title: '客户手机号',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'projectName',
      title: '项目名称',
      align: 'center',
      minWidth: 120,
      ellipsis: true,
      render(row) {
        return (
          <NButton
            type="primary"
            text
            class="font-bold"
            onClick={() => router.push({ path: '/project/info', query: { projectName: row.projectName } })}
          >
            {row.projectName}
          </NButton>
        )
      }
    },
    {
      key: 'rebateCommissionRate',
      title: '返点佣金比例',
      align: 'center',
      minWidth: 100,
      render(row) {
        if (row.rebateCommissionRate === null || row.rebateCommissionRate === undefined) return ''
        const displayValue = (Number(row.rebateCommissionRate) * 100).toFixed(2).replace(/\.?0+$/, '')
        return <span>{displayValue}%</span>
      }
    },
    {
      key: 'rebateCommission',
      title: '返点佣金',
      align: 'center',
      minWidth: 100,
      render(row) {
        if (row.rebateCommission === null || row.rebateCommission === undefined) return ''
        return formatCurrency(row.rebateCommission)
      }
    },
    {
      key: 'referralName',
      title: '报备人',
      align: 'center',
      minWidth: 100
    },
    {
      key: 'referralPhoneNumber',
      title: '报备人手机号',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'createTime',
      title: '报备时间',
      align: 'center',
      minWidth: 160
    },
    {
      key: 'referralChannel',
      title: '推荐渠道',
      align: 'center',
      minWidth: 100
    },
    {
      key: 'remarks',
      title: '备注',
      align: 'center',
      minWidth: 150,
      ellipsis: true
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 80,
      render: row => {
        if (!hasAuth('business:referral:edit')) {
          return null
        }
        return (
          <div class="flex-center gap-8px">
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:drive-file-rename-outline-outline"
              tooltipContent={$t('common.edit')}
              onClick={() => edit(row.id)}
            />
          </div>
        )
      }
    }
  ]
})

const { drawerVisible, operateType, handleAdd, checkedRowKeys } = useTableOperate(data, getData)

async function edit(id: CommonType.IdType) {
  const { data: referralData, error } = await fetchGetReferral(id)
  if (!error && referralData) {
    operateType.value = 'edit'
    editingDetail.value = referralData
    drawerVisible.value = true
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-12px overflow-hidden lt-sm:overflow-auto">
    <ReferralSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="客户报备列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="true"
          :loading="loading"
          :show-add="hasAuth('business:referral:add')"
          :show-delete="hasAuth('business:referral:remove')"
          :show-export="hasAuth('business:referral:export')"
          @add="handleAdd"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1200"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="h-full"
      />
      <ReferralOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingDetail"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
