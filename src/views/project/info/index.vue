<script setup lang="tsx">
import { h, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NDivider } from 'naive-ui'
import dayjs from 'dayjs'
import { fetchBatchDeleteProject, fetchGetProjectList, fetchUpdateSwtichValue } from '@/service/api/business/project'
import { useAppStore } from '@/store/modules/app'
import { useAuth } from '@/hooks/business/auth'
import { useDownload } from '@/hooks/business/download'
import { useTable, useTableOperate } from '@/hooks/common/table'
import { useDict } from '@/hooks/business/dict'
import { formatCurrency } from '@/utils/common'
import { $t } from '@/locales'
import ButtonIcon from '@/components/custom/button-icon.vue'
import StatusSwitch from '@/components/custom/status-switch.vue'
import DictTag from '@/components/custom/dict-tag.vue'
import ProjectOperateDrawer from './modules/project-operate-drawer.vue'
import ProjectSearch from './modules/project-search.vue'
import ProjectPriceEditor from './modules/project-price-editor.vue'

defineOptions({
  name: 'ProjectList'
})
// 导入字典
useDict('business_project_switch')
useDict('business_project_stones')
useDict('business_project_phase')
useDict('business_project_phase_timeout')

const appStore = useAppStore()
const route = useRoute()
const { download } = useDownload()
const { hasAuth } = useAuth()

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
  apiFn: fetchGetProjectList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    projectName: (route.query.projectName as string) || null,
    stoneTypeList: null,
    projectPhase: null,
    phaseTimeout: null,
    params: {}
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
      width: 60
    },
    {
      key: 'projectName',
      title: '项目名',
      align: 'center',
      minWidth: 140
    },
    {
      key: 'stoneType',
      title: '石材类型',
      align: 'center',
      minWidth: 140,
      render(row) {
        return <DictTag size="small" value={row.stoneTypeList} dictCode="business_project_stones" />
      }
    },
    {
      key: 'projectPhase',
      title: '项目阶段',
      align: 'center',
      minWidth: 120,
      render(row) {
        const typeMap: Record<string, NaiveUI.ThemeColor> = {
          已测量: 'info',
          已报价: 'warning',
          已签合同: 'success',
          项目结束: 'success'
        }
        const tagType = typeMap[row.projectPhase] || 'default'
        return <DictTag size="small" type={tagType} value={row.projectPhase} dictCode="business_project_phase" />
      }
    },
    {
      key: 'quotedPrice',
      title: '报价',
      align: 'center',
      minWidth: 140,
      render(row) {
        if (!hasAuth('business:project:editPrice')) {
          const value = Number(row.quotedPrice)
          return formatCurrency(value)
        }

        return h(ProjectPriceEditor, {
          row,
          onUpdate: () => getData()
        })
      }
    },
    {
      key: 'rebateCommissionRate',
      title: '返点佣金比例',
      align: 'center',
      minWidth: 120,
      render(row) {
        if (row.rebateCommissionRate === null || row.rebateCommissionRate === undefined) return ''
        const displayValue = (Number(row.rebateCommissionRate) * 100).toFixed(2).replace(/\.?0+$/, '')
        return `${displayValue}%`
      }
    },
    {
      key: 'sendSmsSwitch',
      title: '短信提醒',
      align: 'center',
      minWidth: 120,
      render(row) {
        return (
          <StatusSwitch
            v-model:value={row.sendSmsSwitch}
            onSubmitted={(value, callback) => handleSmsSwitchChange(row, value, callback)}
          />
        )
      }
    },
    {
      key: 'timeOutSwitch',
      title: '系统通知',
      align: 'center',
      minWidth: 120,
      render(row) {
        return (
          <StatusSwitch
            v-model:value={row.timeOutSwitch}
            onSubmitted={(value, callback) => handleTimeoutSwitchChange(row, value, callback)}
          />
        )
      }
    },
    {
      key: 'phaseTimeout',
      title: '进度',
      align: 'center',
      minWidth: 120,
      render(row) {
        return <DictTag size="small" value={row.phaseTimeout} dictCode="business_project_phase_timeout" />
      }
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      minWidth: 120,
      render: row => {
        return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('business:project:edit') || !hasAuth('business:project:remove')) {
            return null
          }
          return <NDivider vertical />
        }

        const editBtn = () => {
          if (!hasAuth('business:project:edit')) {
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
          if (!hasAuth('business:project:remove')) {
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

// 监听路由参数变化，自动搜索
watch(
  () => route.query.projectName,
  newVal => {
    if (newVal) {
      searchParams.projectName = newVal as string
      getDataByPage()
    }
  },
  { immediate: true }
)

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData)

async function handleBatchDelete() {
  // request
  const { error } = await fetchBatchDeleteProject(checkedRowKeys.value)
  if (error) return
  onBatchDeleted()
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteProject([id])
  if (error) return
  onDeleted()
}

function edit(id: CommonType.IdType) {
  handleEdit('id', id)
}

function handleExport() {
  download('/business/project/v1/export', searchParams, `项目信息_${new Date().getTime()}.xlsx`)
}

/** 处理短信提醒开关切换 */
async function handleSmsSwitchChange(
  row: Api.Business.Project,
  value: Api.Common.SwitchStatus,
  callback: (flag: boolean) => void
) {
  const { error } = await fetchUpdateSwtichValue(
    {
      id: row.id,
      sendSmsSwitch: value
    },
    'sms'
  )

  callback(!error)

  if (!error) {
    window.$message?.success($t('page.system.user.statusChangeSuccess'))
    getData()
  }
}

/** 处理系统通知项目阶段超时开关切换 */
async function handleTimeoutSwitchChange(
  row: Api.Business.Project,
  value: Api.Common.SwitchStatus,
  callback: (flag: boolean) => void
) {
  const { error } = await fetchUpdateSwtichValue(
    {
      id: row.id,
      timeOutSwitch: value
    },
    'timeout'
  )

  callback(!error)

  if (!error) {
    window.$message?.success($t('page.system.user.statusChangeSuccess'))
    getData()
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ProjectSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="项目信息列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('business:project:add')"
          :show-delete="hasAuth('business:project:remove')"
          :show-export="hasAuth('business:project:export')"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @export="handleExport"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <ProjectOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
