<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { fetchCreateProject, fetchUpdateProject } from '@/service/api/business/project'
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

function createDefaultModel(): Model {
  return {
    projectName: '',
    stoneTypeList: [],
    quotedPrice: null,
    rebateCommissionRate: 0.0005,
    projectPhase: null,
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

function parseCurrency(input: string) {
  const nums = input.replace(/(,|¥|\s)/g, '').trim()
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
  return nums === '' ? null : Number.NaN
}

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel())
    return
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData)
    model.quotedPrice = Number(props.rowData.quotedPrice)
    model.rebateCommissionRate = Number(props.rowData.rebateCommissionRate)
  }
}

function closeDrawer() {
  visible.value = false
}

async function handleSubmit() {
  await validate()

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
  if (props.operateType === 'add') {
    const { error } = await fetchCreateProject({
      projectName,
      stoneTypeList,
      quotedPrice,
      rebateCommissionRate,
      projectPhase,
      sendSmsSwitch,
      timeOutSwitch
    })
    if (error) return
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateProject({
      id,
      projectName,
      stoneTypeList,
      quotedPrice,
      rebateCommissionRate,
      projectPhase,
      sendSmsSwitch,
      timeOutSwitch
    })
    if (error) return
  }

  window.$message?.success($t('common.updateSuccess'))
  closeDrawer()
  emit('submitted')
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit()
    restoreValidation()
  }
})
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
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
            <NFormItem label="项目阶段" path="projectPhase">
              <DictSelect
                v-model:value="model.projectPhase"
                :placeholder="$t('请选择项目阶段')"
                dict-code="business_project_phase"
                clearable
              />
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
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
