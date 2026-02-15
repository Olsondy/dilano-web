<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useLoading } from '@sa/hooks'
import { fetchAddParty, fetchGetPartiesByPhone, fetchUpdateParty } from '@/service/api/business/parties'
import { useFormRules, useNaiveForm } from '@/hooks/common/form'
import { $t } from '@/locales'

defineOptions({
  name: 'CustomerOperateDrawer'
})

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType
  /** the edit row data */
  rowData?: Api.Business.Party | null
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

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增客户',
    edit: '编辑客户'
  }
  return titles[props.operateType] || '新增客户'
})

type Model = Api.Business.PartyOperateParams

const model: Model = reactive(createDefaultModel())

// Phone validation state
const phoneLoading = ref(false)
const isPhoneDuplicate = ref(false)

function createDefaultModel(): Model {
  return {
    id: '' as unknown as CommonType.IdType,
    partyName: '',
    partyType: 'customer', // Default to customer
    phoneNumber: '',
    address: '',
    landline: '',
    customerContacts: [
      {
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        preferred: '1',
        memos: ''
      }
    ]
  }
}

type RuleKey = 'partyName' | 'phoneNumber' | 'address'

const rules: Record<RuleKey, App.Global.FormRule | App.Global.FormRule[]> = {
  partyName: [createRequiredRule('请输入客户名称')],
  phoneNumber: [createRequiredRule('请输入客户手机号'), patternRules.phone],
  address: [createRequiredRule('请输入客户地址')]
}

// Contacts management
function addContact() {
  if (model.customerContacts && model.customerContacts.length < 3) {
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
  if (model.customerContacts) {
    model.customerContacts.splice(index, 1)
    if (model.customerContacts.length > 0 && !model.customerContacts.some(c => c.preferred === '1')) {
      model.customerContacts[0].preferred = '1'
    }
  }
}

function handlePreferredChange(index: number) {
  if (model.customerContacts) {
    model.customerContacts.forEach((contact, i) => {
      contact.preferred = i === index ? '1' : '0'
    })
  }
}

async function handlePhoneBlur() {
  const phone = model.phoneNumber
  if (!phone) {
    isPhoneDuplicate.value = false
    return
  }

  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone)) return

  phoneLoading.value = true
  try {
    const { data, error } = await fetchGetPartiesByPhone({ phoneNumber: phone })

    if (!error && data) {
      // If we got data back, it exists.
      // However, if we are in edit mode, and the ID matches, it's the same record (not a duplicate).
      if (props.operateType === 'edit' && props.rowData && String(data.id) === String(props.rowData.id)) {
        isPhoneDuplicate.value = false
      } else {
        window.$message?.error('该手机号已存在，无法添加')
        isPhoneDuplicate.value = true
      }
    } else {
      // No data found or 404 handled gracefully (assuming api returns null/error for not found)
      // If error is strictly network, we might want to be careful, but assuming
      // business logic returns data if found.
      isPhoneDuplicate.value = false
    }
  } finally {
    phoneLoading.value = false
  }
}

function closeDrawer() {
  visible.value = false
}

async function handleSubmit() {
  await validate()

  if (isPhoneDuplicate.value) {
    window.$message?.error('手机号已存在，请修改')
    return
  }

  startLoading()

  const api = props.operateType === 'add' ? fetchAddParty : fetchUpdateParty
  const { error } = await api(model)

  if (!error) {
    window.$message?.success($t('common.updateSuccess'))
    closeDrawer()
    emit('submitted')
  }
  endLoading()
}

watch(visible, () => {
  if (visible.value) {
    Object.assign(model, createDefaultModel())
    isPhoneDuplicate.value = false

    if (props.operateType === 'edit' && props.rowData) {
      // Clone rowData to model
      // Be careful with deep structures like customerContacts
      const { ...rest } = props.rowData
      const contacts = (props.rowData as any).contacts || (props.rowData as any).customerContacts

      Object.assign(model, rest)

      if (contacts && contacts.length > 0) {
        model.customerContacts = contacts.map((c: any) => ({ ...c }))
      } else {
        // Ensure at least one contact slot if none exist
        model.customerContacts = [
          {
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            preferred: '1',
            memos: ''
          }
        ]
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
          <NSpin :show="phoneLoading">
            <NSpace vertical :size="12">
              <div class="border-l-4 border-primary pl-12px text-16px font-bold">基本信息</div>
              <NGrid :x-gap="12" :cols="2">
                <NFormItemGi label="客户名称" path="partyName">
                  <NInput v-model:value="model.partyName" placeholder="请输入客户名称" />
                </NFormItemGi>
                <NFormItemGi label="客户手机号" path="phoneNumber">
                  <NInput v-model:value="model.phoneNumber" placeholder="请输入客户手机号" @blur="handlePhoneBlur" />
                </NFormItemGi>
                <NFormItemGi label="客户地址" path="address">
                  <NInput v-model:value="model.address" placeholder="请输入客户地址" />
                </NFormItemGi>
                <NFormItemGi label="固定电话" path="landline">
                  <NInput v-model:value="model.landline" placeholder="请输入固定电话" />
                </NFormItemGi>
              </NGrid>

              <NDivider />

              <NCollapse :default-expanded-names="['contacts']">
                <NCollapseItem title="客户联系人信息" name="contacts">
                  <template #header-extra>
                    <NButton
                      v-if="model.customerContacts && model.customerContacts.length < 3"
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
                        v-if="(model.customerContacts?.length || 0) > 1"
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
        </NForm>
      </NSpin>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" :loading="loading" :disabled="isPhoneDuplicate" @click="handleSubmit">
            {{ $t('common.save') }}
          </NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
