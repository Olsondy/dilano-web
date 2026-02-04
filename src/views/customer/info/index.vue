<script setup lang="tsx">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NCard, NDataTable, NDivider, NTag } from 'naive-ui'
import dayjs from 'dayjs'
import { fetchDeleteParty, fetchGetPartyDetail, fetchGetPartyList } from '@/service/api/business/parties'
import { useAppStore } from '@/store/modules/app'
import { useTable, useTableOperate } from '@/hooks/common/table'
import { useAuth } from '@/hooks/business/auth'
import { $t } from '@/locales'
import ButtonIcon from '@/components/custom/button-icon.vue'
import CustomerSearch from './modules/customer-search.vue'
import CustomerOperateDrawer from './modules/customer-operate-drawer.vue'

defineOptions({
  name: 'CustomerInfo'
})

const appStore = useAppStore()
const route = useRoute()
const { hasAuth } = useAuth()
const editingDetail = ref<Api.Business.Party | null>(null)

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
  apiFn: fetchGetPartyList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    partyName: (route.query.partyName as string) || null,
    phoneNumber: null,
    partyType: null,
    createTime: null
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
      key: 'partyName',
      title: '客户名称',
      align: 'center',
      minWidth: 100
    },
    {
      key: 'phoneNumber',
      title: '手机号',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'address',
      title: '地址',
      align: 'center',
      minWidth: 150,
      ellipsis: true
    },
    {
      key: 'landline',
      title: '固定电话',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'partyType',
      title: '角色类型',
      align: 'center',
      width: 100,
      render: row => {
        const typeMap: Record<string, { label: string; type: 'success' | 'info' | 'warning' }> = {
          customer: { label: '客户', type: 'success' },
          referral: { label: '报备人', type: 'warning' }
        }
        const tag = typeMap[row.partyType] || { label: row.partyType, type: 'info' }
        return <NTag type={tag.type}>{tag.label}</NTag>
      }
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      minWidth: 160,
      render: row => (row.createTime ? dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') : '')
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('business:parties:edit') || !hasAuth('business:parties:remove')) {
            return null
          }
          return <NDivider vertical />
        }

        const editBtn = () => {
          if (!hasAuth('business:parties:edit')) {
            return null
          }
          return (
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:drive-file-rename-outline-outline"
              tooltipContent={$t('common.edit')}
              onClick={() => edit(row.id!)}
            />
          )
        }

        const deleteBtn = () => {
          if (!hasAuth('business:parties:remove')) {
            return null
          }
          return (
            <ButtonIcon
              text
              type="error"
              icon="material-symbols:delete-outline"
              tooltipContent={$t('common.delete')}
              popconfirmContent={$t('common.confirmDelete')}
              onPositiveClick={() => handleDelete(row.id!)}
            />
          )
        }

        return (
          <div class="flex-center gap-8px">
            {editBtn()}
            {divider()}
            {deleteBtn()}
          </div>
        )
      }
    }
  ]
})

const { drawerVisible, operateType, handleAdd, checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(
  data,
  getData
)

async function handleBatchDelete() {
  const { error } = await fetchDeleteParty(checkedRowKeys.value)
  if (!error) {
    onBatchDeleted()
  }
}

async function handleDelete(id: CommonType.IdType) {
  const { error } = await fetchDeleteParty([id])
  if (!error) {
    onDeleted()
  }
}

async function edit(id: CommonType.IdType) {
  const { data: detail, error } = await fetchGetPartyDetail(id)
  if (!error && detail) {
    operateType.value = 'edit'
    editingDetail.value = detail
    drawerVisible.value = true
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-12px overflow-hidden lt-sm:overflow-auto">
    <CustomerSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="客户信息列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:parties:add')"
          :show-delete="hasAuth('business:parties:remove')"
          :show-export="hasAuth('business:parties:export')"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="960"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="h-full"
      />
      <CustomerOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingDetail"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
