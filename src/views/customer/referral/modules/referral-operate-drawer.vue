<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from '@sa/hooks'
import { fetchGetPartiesByPhone, fetchMerageReferral } from '@/service/api/business/referral'
import { fetchGetProjectList } from '@/service/api/business/project'
import { useFormRules, useNaiveForm } from '@/hooks/common/form'
import { formatCurrency } from '@/utils/common'
import { $t } from '@/locales'

defineOptions({
  name: 'ReferralOperateDrawer'
})

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType
  /** the edit row data */
  rowData?: Api.Business.ReferralDetail | null
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
const { createRequiredRule, patternRules } = useFormRules()
const router = useRouter()

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增客户报备',
    edit: '编辑客户报备'
  }
  return titles[props.operateType] || '新增客户报备'
})

type Model = Api.Business.ReferralOperateParams

const model: Model = reactive(createDefaultModel())

const isCustomerFormal = ref(false)
const isReferralFormal = ref(false)
const isCustomerExist = ref(false)
const customerPhoneLoading = ref(false)
const referralPhoneLoading = ref(false)

function createDefaultModel(): Model {
  return {
    project: {
      id: 0 as unknown as CommonType.IdType,
      projectName: '',
      quotedPrice: 0,
      rebateCommissionRate: 0,
      stoneTypeList: [],
      projectPhase: '',
      phaseTimeout: ''
    },
    customer: {
      id: '',
      partyName: '',
      phoneNumber: '',
      address: '',
      landline: ''
    },
    customerContacts: [
      {
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        preferred: '1',
        memos: ''
      }
    ],
    referral: {
      id: '',
      partyName: '',
      phoneNumber: '',
      address: ''
    },
    referralChannel: '',
    remarks: ''
  }
}

function transDetailToModel(detail: Api.Business.ReferralDetail): Model {
  // Map ReferralDetail (which is flat + contacts) to CustomerParams (flat + contacts)
  return {
    id: detail.id,
    project: {
      id: detail.projectId,
      projectName: detail.projectName,
      quotedPrice: 0,
      rebateCommissionRate: detail.rebateCommissionRate,
      stoneTypeList: [],
      projectPhase: '',
      phaseTimeout: ''
    },
    customer: {
      id: detail.customerId,
      partyName: detail.customerName,
      phoneNumber: detail.customerPhoneNumber,
      address: detail.customerAddress || '',
      landline: detail.customerLandline || ''
    },
    customerContacts: detail.customerContacts
      ? detail.customerContacts.map(c => ({
          contactName: c.contactName,
          contactPhone: c.contactPhone,
          contactEmail: c.contactEmail,
          preferred: c.preferred,
          memos: c.memos
        }))
      : [],
    referral: {
      id: detail.referralId,
      partyName: detail.referralName,
      phoneNumber: detail.referralPhoneNumber,
      address: '' // Detail may not have address, defaulting to empty
    },
    referralChannel: detail.referralChannel,
    remarks: detail.remarks
  }
}

type RuleKey =
  | 'customer.partyName'
  | 'customer.phoneNumber'
  | 'customer.address'
  | 'project.projectName'
  | 'referral.partyName'
  | 'referral.phoneNumber'

const rules: Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]> = {
  'customer.partyName': [createRequiredRule('请输入客户名称')],
  'customer.phoneNumber': [createRequiredRule('请输入客户手机号'), patternRules.phone],
  'customer.address': [createRequiredRule('请输入客户地址')],
  'project.projectName': [createRequiredRule('请输入/搜索项目名称')],
  'referral.partyName': [createRequiredRule('请输入报备人名称')],
  'referral.phoneNumber': [
    createRequiredRule('请输入报备人手机号'),
    patternRules.phone,
    {
      validator: (_rule: any, value: string) => {
        if (!value) return true
        if (value === model.customer.phoneNumber) {
          return new Error('报备人手机号不能与客户手机号一致')
        }
        const isContactPhoneDuplicate = model.customerContacts.some(contact => contact.contactPhone === value)
        if (isContactPhoneDuplicate) {
          return new Error('报备人手机号不能与联系人手机号一致')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ]
}

function parseCurrency(input: string) {
  const nums = input.replace(/(,|¥|\s)/g, '').trim()
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
  return nums === '' ? null : Number.NaN
}

async function handlePhoneBlur(type: 'customer' | 'referral') {
  const phone = type === 'customer' ? model.customer.phoneNumber : model.referral.phoneNumber

  if (!phone) {
    if (type === 'customer') isCustomerExist.value = false
    return
  }

  if (!/^1[3-9]\d{9}$/.test(phone)) return

  if (type === 'customer') customerPhoneLoading.value = true
  else referralPhoneLoading.value = true

  try {
    const { data, error } = await fetchGetPartiesByPhone({ phoneNumber: phone })
    if (!error && data) {
      if (type === 'customer') {
        fillCustomerData(data)
      } else {
        fillReferralData(data)
      }
    } else if (type === 'customer') {
      isCustomerExist.value = false
      isCustomerFormal.value = false
      model.customer.id = ''
    } else {
      isReferralFormal.value = false
      model.referral.id = ''
    }
  } finally {
    if (type === 'customer') customerPhoneLoading.value = false
    else referralPhoneLoading.value = false
  }
}

function fillCustomerData(data: any) {
  const isFormal = data.partyType === 'customer'
  if (isFormal) {
    window.$message?.error('该客户已存在，无法报备')
    isCustomerExist.value = true
  } else {
    isCustomerExist.value = false
  }
  isCustomerFormal.value = isFormal
  model.customer.partyName = data.partyName
  model.customer.address = data.address || ''
  model.customer.landline = data.landline || ''
  if (data.id) {
    model.customer.id = data.id
  }

  // 回填联系人信息
  const contacts = data.contacts || data.customerContacts
  if (contacts && contacts.length > 0) {
    model.customerContacts = contacts.map((c: any) => ({
      contactName: c.contactName,
      contactPhone: c.contactPhone,
      contactEmail: c.contactEmail,
      preferred: c.preferred,
      memos: c.memos
    }))
  }
}

function fillReferralData(data: any) {
  isReferralFormal.value = data.partyType === 'customer'
  model.referral.partyName = data.partyName
  model.referral.address = data.address || ''
  if (data.id) {
    model.referral.id = data.id
  }
}

function handleToCustomerManage() {
  router.push('/system/user') // Using System User as placeholder, modify as needed
}

// Contacts management
function addContact() {
  if (model.customerContacts.length < 3) {
    model.customerContacts.push({
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      preferred: '0',
      memos: ''
    })
  }
}

function removeContact(index: number) {
  model.customerContacts.splice(index, 1)
  if (model.customerContacts.length > 0 && !model.customerContacts.some(c => c.preferred === '1')) {
    model.customerContacts[0].preferred = '1'
  }
}

function handlePreferredChange(index: number) {
  model.customerContacts.forEach((contact, i) => {
    contact.preferred = i === index ? '1' : '0'
  })
}

// Project Remote Search
const projectOptions = ref<Api.Business.Project[]>([])
const projectLoading = ref(false)

async function handleSearchProject(query: string) {
  projectLoading.value = true
  const { data, error } = await fetchGetProjectList({ projectName: query, pageNum: 1, pageSize: 20 })
  if (!error && data) {
    projectOptions.value = data.rows
  }
  projectLoading.value = false
}

function handleSelectProject(value: string | null) {
  const project = projectOptions.value.find(p => p.projectName === value)
  if (project) {
    model.project.id = project.id
    model.project.projectName = project.projectName
    model.project.quotedPrice = project.quotedPrice
    model.project.stoneTypeList = project.stoneTypeList
    model.project.projectPhase = project.projectPhase
    model.project.phaseTimeout = project.phaseTimeout
    model.project.rebateCommissionRate = project.rebateCommissionRate
  } else {
    resetProjectModel()
  }
}

function resetProjectModel() {
  model.project.id = 0 as unknown as CommonType.IdType
  model.project.projectName = ''
  model.project.quotedPrice = 0
  model.project.stoneTypeList = []
  model.project.projectPhase = ''
  model.project.phaseTimeout = ''
  model.project.rebateCommissionRate = 0
}

function handleProjectBlur() {
  if (!model.project.id || model.project.id === (0 as unknown as CommonType.IdType)) {
    resetProjectModel()
  }
}

function closeDrawer() {
  visible.value = false
}

async function handleSubmit() {
  await validate()
  startLoading()
  const { error } = await fetchMerageReferral(model)
  if (!error) {
    window.$message?.success($t('common.updateSuccess'))
    closeDrawer()
    emit('submitted')
  }
  endLoading()
}

watch(visible, async () => {
  if (visible.value) {
    Object.assign(model, createDefaultModel())
    isCustomerFormal.value = false
    isReferralFormal.value = false
    isCustomerExist.value = false

    if (props.operateType === 'edit' && props.rowData) {
      const convertedModel = transDetailToModel(props.rowData)
      Object.assign(model, convertedModel)

      if (props.rowData.partyType === 'customer') {
        isCustomerFormal.value = true
      }

      // 如果有项目名称，去查询最新的项目信息并回显
      if (model.project.projectName) {
        // 1. 搜索项目
        await handleSearchProject(model.project.projectName)
        // 2. 查找匹配项
        const matchedProject = projectOptions.value.find(p => p.projectName === model.project.projectName)
        // 3. 用最新信息覆盖模型中的项目信息
        if (matchedProject) {
          model.project.id = matchedProject.id
          model.project.quotedPrice = matchedProject.quotedPrice
          model.project.rebateCommissionRate = matchedProject.rebateCommissionRate
          model.project.stoneTypeList = matchedProject.stoneTypeList
          model.project.projectPhase = matchedProject.projectPhase
          model.project.phaseTimeout = matchedProject.phaseTimeout
        }
      }
    }
    restoreValidation()
  }
})
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NSpin :show="loading">
        <NForm ref="formRef" :model="model" :rules="rules" label-placement="top">
          <!-- Section 1: Customer Info -->
          <NSpin :show="customerPhoneLoading">
            <NSpace vertical :size="12">
              <div class="border-l-4 border-primary pl-12px text-16px font-bold">客户信息</div>
              <NGrid :x-gap="12" :cols="2">
                <NFormItemGi path="customer.partyName">
                  <template #label>
                    <span>客户名称</span>
                    <NTooltip v-if="isCustomerFormal">
                      <template #trigger>
                        <icon-ic-round-lock class="ml-4px text-primary" />
                      </template>
                      <span>
                        信息已锁定, 如需修改请前往
                        <NButton text type="primary" @click="handleToCustomerManage">【客户管理】</NButton>
                        页面
                      </span>
                    </NTooltip>
                  </template>
                  <NInput
                    v-model:value="model.customer.partyName"
                    :disabled="isCustomerFormal"
                    placeholder="请输入客户名称"
                  />
                </NFormItemGi>
                <NFormItemGi label="客户手机号" path="customer.phoneNumber">
                  <NInput
                    v-model:value="model.customer.phoneNumber"
                    placeholder="请输入客户手机号"
                    :loading="customerPhoneLoading"
                    @blur="handlePhoneBlur('customer')"
                  />
                </NFormItemGi>
                <NFormItemGi label="客户地址" path="customer.address">
                  <NInput
                    v-model:value="model.customer.address"
                    :disabled="isCustomerFormal"
                    placeholder="请输入客户地址"
                  />
                </NFormItemGi>
                <NFormItemGi label="客户固定电话" path="customer.landline">
                  <NInput
                    v-model:value="model.customer.landline"
                    :disabled="isCustomerFormal"
                    placeholder="请输入客户固定电话"
                  />
                </NFormItemGi>
              </NGrid>

              <NCollapse :default-expanded-names="['contacts']">
                <NCollapseItem title="客户联系人信息" name="contacts">
                  <template #header-extra>
                    <NButton
                      v-if="model.customerContacts.length < 3"
                      size="tiny"
                      type="primary"
                      @click.stop="addContact"
                    >
                      <template #icon>
                        <icon-ic-round-add />
                      </template>
                      新增联系人
                    </NButton>
                  </template>
                  <div
                    v-for="(contact, index) in model.customerContacts"
                    :key="index"
                    class="relative mb-12px border border-gray-200 rounded-8px p-12px"
                  >
                    <div class="absolute right-8px top-8px">
                      <NButton
                        v-if="model.customerContacts.length > 1"
                        size="tiny"
                        type="error"
                        quaternary
                        @click="removeContact(index)"
                      >
                        <template #icon>
                          <icon-ic-round-delete />
                        </template>
                      </NButton>
                    </div>
                    <NGrid :x-gap="12" :cols="2">
                      <NFormItemGi
                        label="联系人名称"
                        :path="`customerContacts[${index}].contactName`"
                        :rule="createRequiredRule('请输入联系人名称')"
                      >
                        <NInput v-model:value="contact.contactName" placeholder="请输入联系人名称" />
                      </NFormItemGi>
                      <NFormItemGi
                        label="联系人电话"
                        :path="`customerContacts[${index}].contactPhone`"
                        :rule="[createRequiredRule('请输入联系人电话'), patternRules.phone]"
                      >
                        <NInput v-model:value="contact.contactPhone" placeholder="请输入联系人电话" />
                      </NFormItemGi>
                      <NFormItemGi label="联系人邮箱" :path="`customerContacts[${index}].contactEmail`">
                        <NInput v-model:value="contact.contactEmail" placeholder="请输入联系人邮箱" />
                      </NFormItemGi>
                      <NFormItemGi label="是否首要联系人">
                        <NSwitch
                          v-model:value="contact.preferred"
                          checked-value="1"
                          unchecked-value="0"
                          @update:value="handlePreferredChange(index)"
                        />
                      </NFormItemGi>
                      <NFormItemGi label="备注" :span="2">
                        <NInput v-model:value="contact.memos" type="textarea" placeholder="请输入联系人备注" />
                      </NFormItemGi>
                    </NGrid>
                  </div>
                </NCollapseItem>
              </NCollapse>
            </NSpace>
          </NSpin>

          <NDivider />

          <!-- Section 2: Project Info -->
          <NSpace vertical :size="12">
            <div class="border-l-4 border-primary pl-12px text-16px font-bold">项目信息</div>
            <NGrid :x-gap="12" :cols="2">
              <NFormItemGi label="项目名称" path="project.projectName">
                <NSelect
                  v-model:value="model.project.projectName"
                  filterable
                  placeholder="搜索或输入项目名称"
                  :options="projectOptions.map(p => ({ label: p.projectName, value: p.projectName }))"
                  :loading="projectLoading"
                  remote
                  clearable
                  @focus="() => handleSearchProject('')"
                  @search="handleSearchProject"
                  @update:value="handleSelectProject"
                  @blur="handleProjectBlur"
                />
              </NFormItemGi>
              <NFormItemGi label="项目报价" path="project.quotedPrice">
                <NInputNumber
                  v-model:value="model.project.quotedPrice"
                  class="w-full"
                  disabled
                  :parse="parseCurrency"
                  :format="
                    (value: number | null) => {
                      if (value === null) return ''
                      const numberValue = formatCurrency(value)
                      return `${numberValue}`
                    }
                  "
                  placeholder=""
                />
              </NFormItemGi>
              <NFormItemGi label="返点佣金比例" path="project.rebateCommissionRate">
                <NInputNumber
                  v-model:value="model.project.rebateCommissionRate"
                  class="w-full"
                  disabled
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
                  placeholder=""
                />
              </NFormItemGi>
              <NFormItemGi label="石材类型" path="project.stoneTypeList">
                <DictSelect
                  v-model:value="model.project.stoneTypeList"
                  dict-code="business_project_stones"
                  multiple
                  disabled
                  placeholder=""
                />
              </NFormItemGi>
              <NFormItemGi label="项目进度" path="project.projectPhase">
                <DictSelect
                  v-model:value="model.project.projectPhase"
                  dict-code="business_project_phase"
                  disabled
                  placeholder=""
                />
              </NFormItemGi>
              <NFormItemGi label="项目进度状态" path="project.phaseTimeout">
                <NSelect
                  v-model:value="model.project.phaseTimeout"
                  disabled
                  :options="[
                    { label: '正常', value: '0' },
                    { label: '超时', value: '1' }
                  ]"
                  placeholder=""
                />
              </NFormItemGi>
            </NGrid>
          </NSpace>

          <NDivider />

          <!-- Section 3: Referral Info -->
          <NSpin :show="referralPhoneLoading">
            <NSpace vertical :size="12">
              <div class="border-l-4 border-primary pl-12px text-16px font-bold">推荐人信息</div>
              <NGrid :x-gap="12" :cols="2">
                <NFormItemGi path="referral.partyName">
                  <template #label>
                    <span>推荐人名称</span>
                    <NTooltip v-if="isReferralFormal">
                      <template #trigger>
                        <icon-ic-round-lock class="ml-4px text-primary" />
                      </template>
                      <span>
                        信息已锁定, 如需修改请前往
                        <NButton text type="primary" @click="handleToCustomerManage">【客户管理】</NButton>
                        页面
                      </span>
                    </NTooltip>
                  </template>
                  <NInput
                    v-model:value="model.referral.partyName"
                    :disabled="isReferralFormal"
                    placeholder="请输入推荐人名称"
                  />
                </NFormItemGi>
                <NFormItemGi label="推荐人手机号" path="referral.phoneNumber">
                  <NInput
                    v-model:value="model.referral.phoneNumber"
                    placeholder="请输入推荐人手机号"
                    :loading="referralPhoneLoading"
                    @blur="handlePhoneBlur('referral')"
                  />
                </NFormItemGi>
                <NFormItemGi label="推荐人地址" path="referral.address">
                  <NInput
                    v-model:value="model.referral.address"
                    :disabled="isReferralFormal"
                    placeholder="请输入推荐人地址"
                  />
                </NFormItemGi>
                <NFormItemGi label="推荐人渠道" path="referralChannel">
                  <NInput v-model:value="model.referralChannel" placeholder="请输入推荐人渠道" />
                </NFormItemGi>
                <NFormItemGi label="备注" path="referralRemarks" :span="2">
                  <NInput
                    v-model:value="model.remarks"
                    type="textarea"
                    :maxlength="500"
                    show-count
                    placeholder="请输入备注"
                  />
                </NFormItemGi>
              </NGrid>
            </NSpace>
          </NSpin>
        </NForm>
      </NSpin>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" :loading="loading" :disabled="isCustomerExist" @click="handleSubmit">
            {{ $t('common.save') }}
          </NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
