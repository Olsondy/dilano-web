<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useLoading } from '@sa/hooks'
import { fetchCreateProject, fetchGetProjectDetail, fetchUpdateProject } from '@/service/api/business/project'
import { useFormRules, useNaiveForm } from '@/hooks/common/form'
import { formatCurrency } from '@/utils/common'
import { $t } from '@/locales'

defineOptions({
  name: 'ProjectOperateDrawer'
})

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType
  /** the edit row data */
  rowData?: Api.Business.Project | null
}

const props = defineProps<Props>()

interface Emits {
  (e: 'submitted'): void
}

const emit = defineEmits<Emits>()

const visible = defineModel<boolean>('visible', {
  default: false
})

const { loading, startLoading, endLoading } = useLoading()
const { formRef, validate, restoreValidation } = useNaiveForm()
const { createRequiredRule, createNumberRequiredRule } = useFormRules()

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增项目信息',
    edit: '编辑项目信息'
  }
  return titles[props.operateType]
})

type Model = Api.Business.ProjectOperateParams

const model: Model = reactive(createDefaultModel())
const projectPhaseLockRemainingSeconds = ref(0)
const projectPhaseChangeIntervalSeconds = ref(0)

function createDefaultModel(): Model {
  return {
    projectName: '',
    stoneTypeList: [],
    quotedPrice: null,
    rebateCommissionRate: 0.0005,
    projectPhase: 'created',
    sendSmsSwitch: '1',
    timeOutSwitch: '1'
  }
}

type RuleKey = Extract<
  keyof Model,
  'projectName' | 'stoneTypeList' | 'quotedPrice' | 'rebateCommissionRate' | 'projectPhase'
>

const rules: Record<RuleKey, App.Global.FormRule> = {
  projectName: createRequiredRule('项目名称不能为空'),
  stoneTypeList: createRequiredRule('石材类型不能为空'),
  projectPhase: createRequiredRule('项目阶段不能为空'),
  quotedPrice: createNumberRequiredRule('报价不能为空'),
  rebateCommissionRate: createNumberRequiredRule('返点佣金比例不能为空')
}

const projectPhaseDisabled = computed(() => {
  if (props.operateType === 'add') {
    return true
  }
  return model.sendSmsSwitch === '1' && projectPhaseLockRemainingSeconds.value > 0
})

const showProjectPhaseLockTip = computed(() => {
  return props.operateType === 'edit' && model.sendSmsSwitch === '1' && projectPhaseLockRemainingSeconds.value > 0
})

const projectPhaseLockTip = computed(() => {
  const intervalText = formatDuration(projectPhaseChangeIntervalSeconds.value)
  const remainingText = formatDuration(projectPhaseLockRemainingSeconds.value)
  return `距离上次项目阶段修改未超过${intervalText}，当前项目阶段暂不可编辑，约 ${remainingText} 后可再次修改。其他字段仍可编辑并保存；关闭短信提醒后不受此限制。`
})

function parseCurrency(input: string) {
  const nums = input.replace(/(,|¥|\s)/g, '').trim()
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
  return nums === '' ? null : Number.NaN
}

function resetProjectPhaseLockState() {
  projectPhaseLockRemainingSeconds.value = 0
  projectPhaseChangeIntervalSeconds.value = 0
}

function formatDuration(seconds: number) {
  if (seconds <= 0) {
    return '0秒'
  }
  if (seconds < 60) {
    return `${seconds}秒`
  }
  const minutes = Math.floor(seconds / 60)
  const remainSeconds = seconds % 60
  if (remainSeconds === 0) {
    return `${minutes}分钟`
  }
  return `${minutes}分${remainSeconds}秒`
}

function applyProjectDetail(project: Api.Business.Project) {
  Object.assign(model, project)
  model.quotedPrice = Number(project.quotedPrice)
  model.rebateCommissionRate = Number(project.rebateCommissionRate)
  projectPhaseLockRemainingSeconds.value = Number(project.projectPhaseLockRemainingSeconds ?? 0)
  projectPhaseChangeIntervalSeconds.value = Number(project.projectPhaseChangeIntervalSeconds ?? 0)
}

async function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel())
    resetProjectPhaseLockState()
    return
  }

  if (props.operateType === 'edit' && props.rowData?.id) {
    startLoading()
    try {
      const { data, error } = await fetchGetProjectDetail(props.rowData.id)
      if (!error && data) {
        applyProjectDetail(data)
        return
      }
      applyProjectDetail(props.rowData)
      resetProjectPhaseLockState()
    } finally {
      endLoading()
    }
  }
}

function closeDrawer() {
  visible.value = false
}

async function handleSubmit() {
  await validate()

  startLoading()

  const {
    id,
    projectName,
    stoneTypeList,
    quotedPrice,
    rebateCommissionRate,
    projectPhase,
    sendSmsSwitch,
    timeOutSwitch
  } = model

  // request
  const api = props.operateType === 'add' ? fetchCreateProject : fetchUpdateProject
  const params =
    props.operateType === 'add'
      ? { projectName, stoneTypeList, quotedPrice, rebateCommissionRate, projectPhase, sendSmsSwitch, timeOutSwitch }
      : {
          id,
          projectName,
          stoneTypeList,
          quotedPrice,
          rebateCommissionRate,
          projectPhase,
          sendSmsSwitch,
          timeOutSwitch
        }

  const { error } = await api(params as any)

  if (!error) {
    window.$message?.success($t('common.updateSuccess'))
    closeDrawer()
    emit('submitted')
  }

  endLoading()
}

watch(visible, async isVisible => {
  if (isVisible) {
    await handleUpdateModelWhenEdit()
    restoreValidation()
  }
})
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NSpin :show="loading">
        <NForm ref="formRef" :model="model" :rules="rules">
          <NFormItem label="项目名" path="projectName">
            <NInput v-model:value="model.projectName" placeholder="请输入项目名" />
          </NFormItem>
          <NFormItem label="石材类型" path="stoneTypeList">
            <DictSelect
              v-model:value="model.stoneTypeList"
              :placeholder="$t('请选择石材类型')"
              dict-code="business_project_stones"
              multiple
            />
          </NFormItem>
          <NRow :gutter="[0, 24]">
            <NCol :span="8">
              <NFormItem path="projectPhase">
                <template #label>
                  <div class="flex-center">
                    <FormTip
                      :content="
                        showProjectPhaseLockTip
                          ? projectPhaseLockTip
                          : '项目阶段变更会触发短信提醒；开启短信提醒后，短时间内会按系统配置限制重复修改。'
                      "
                    />
                    <span>项目阶段</span>
                  </div>
                </template>
                <DictSelect
                  v-model:value="model.projectPhase"
                  :placeholder="$t('请选择项目阶段')"
                  dict-code="business_project_phase"
                  :disabled="projectPhaseDisabled"
                  :disabled-options="operateType === 'edit' ? ['created'] : []"
                  clearable
                />
                <div v-if="showProjectPhaseLockTip" class="mt-8px text-12px text-#d97706">
                  {{ projectPhaseLockTip }}
                </div>
              </NFormItem>
            </NCol>
            <NCol :span="7" :offset="1">
              <NFormItem label="报价" path="quotedPrice">
                <NInputNumber
                  v-model:value="model.quotedPrice"
                  :parse="parseCurrency"
                  :format="
                    (value: number | null) => {
                      if (value === null) return ''
                      const numberValue = formatCurrency(value)
                      return `${numberValue}`
                    }
                  "
                  placeholder="请输入报价"
                />
              </NFormItem>
            </NCol>
            <NCol :span="7" :offset="1">
              <NFormItem label="返点佣金比例" path="rebateCommissionRate">
                <NInputNumber
                  v-model:value="model.rebateCommissionRate"
                  :format="
                    (value: number | null) => {
                      if (value === null) return ''
                      // Display as value * 100 (e.g., 0.05 -> 5)
                      const displayValue = (value * 100).toFixed(2).replace(/\.?0+$/, '')
                      return `${displayValue}%`
                    }
                  "
                  :parse="
                    (input: string) => {
                      const nums = input.replace(/%/g, '').trim()
                      // Parse as input / 100 (e.g., 5 -> 0.05)
                      if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums) / 100
                      return nums === '' ? null : Number.NaN
                    }
                  "
                  placeholder="请输入返点佣金比例"
                />
              </NFormItem>
            </NCol>
          </NRow>

          <NRow :gutter="[0, 24]">
            <NCol :span="12">
              <NFormItem path="sendSmsSwitch">
                <template #label>
                  <div class="flex-center">
                    <FormTip :content="$t('关闭后将无法接收项目阶段变更的短信提醒')" />
                    <span>{{ $t('发送短信提醒') }}</span>
                  </div>
                </template>
                <DictRadio v-model:value="model.sendSmsSwitch" dict-code="business_project_switch" />
              </NFormItem>
            </NCol>
            <NCol :span="8" :offset="4">
              <NFormItem path="timeOutSwitch">
                <template #label>
                  <div class="flex-center">
                    <FormTip :content="$t('关闭后将无法接收项目进度超时的系统通知')" />
                    <span>{{ $t('项目阶段超时系统通知') }}</span>
                  </div>
                </template>
                <DictRadio v-model:value="model.timeOutSwitch" dict-code="business_project_switch" />
              </NFormItem>
            </NCol>
          </NRow>
        </NForm>
      </NSpin>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" :loading="loading" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
