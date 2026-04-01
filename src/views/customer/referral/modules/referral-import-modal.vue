<script setup lang="ts">
import { h, nextTick, ref, watch } from 'vue'
import type { UploadFileInfo } from 'naive-ui'
import * as XLSX from 'xlsx'
import { getToken } from '@/store/modules/auth/shared'
import { getServiceBaseURL } from '@/utils/service'
import { $t } from '@/locales'

defineOptions({
  name: 'ReferralImportModal'
})

interface Emits {
  (e: 'submitted'): void
}

const emit = defineEmits<Emits>()

const { baseURL } = getServiceBaseURL(import.meta.env)

const visible = defineModel<boolean>('visible', {
  default: false
})

const headers: Record<string, string> = {
  Authorization: `Bearer ${getToken()}`,
  clientid: import.meta.env.VITE_APP_CLIENT_ID!
}

const uploadRef = ref()
const message = ref('')
const success = ref(false)
const hasImported = ref(false)
const submitting = ref(false)
const fileList = ref<UploadFileInfo[]>([])

/** 处理文件列表更新 (受控模式) */
function handleFileListChange(data: UploadFileInfo[]) {
  fileList.value = data
}

/** 前端预检行数 */
async function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  const file = data.file.file
  if (!file) return true

  return new Promise<boolean>(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const result = e.target?.result
        const workbook = XLSX.read(result, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        const refRange = worksheet['!ref']
        if (!refRange) {
          resolve(true)
          return
        }
        const range = XLSX.utils.decode_range(refRange)
        const rowCount = range.e.r - range.s.r

        if (rowCount > 1000) {
          window.$message?.error(`导入失败：文件行数（${rowCount}行）超过了 1000 行限制`)
          resolve(false)
        } else {
          resolve(true)
        }
      } catch {
        resolve(true)
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

/** 导入结果数据结构 */
interface ImportResult {
  status: 'SUCCESS' | 'PARTIAL_SUCCESS' | 'FAIL'
  totalCount: number
  successCount: number
  failCount: number
  errorRows: Array<{
    excelRowNum: number
    errorMessage: string
    projectName: string
    customerName: string
    customerPhoneNumber: string
  }>
}

const importResult = ref<ImportResult | null>(null)

function closeDrawer() {
  visible.value = false
  if (hasImported.value) {
    emit('submitted')
  }
}

/** 执行真实导入接口 */
async function handleSubmit() {
  if (fileList.value.length === 0) {
    window.$message?.warning('请先选择要上传的文件')
    return
  }

  submitting.value = true
  uploadRef.value?.submit() // 恢复调用真实接口
}

/** 下载模板 */
function handleDownloadTemplate() {
  window.open('/template/referral-import-template.xlsx', '_blank')
}

/** 上传完成回调 (真实接口返回后执行) */
function handleFinish({ event }: { event?: ProgressEvent }) {
  submitting.value = false
  const responseText = (event?.target as any)?.responseText
  if (!responseText) return

  try {
    const response = JSON.parse(responseText)

    // 兼容数字和字符串类型的 code 判断
    if (Number(response.code) === 200) {
      importResult.value = response.data
      message.value = response.msg
      success.value = true
      hasImported.value = true
      window.$message?.success(response.msg || $t('common.importSuccess'))

      // 使用 nextTick + setTimeout 确保在组件内部状态更新后再执行物理清空
      nextTick(() => {
        setTimeout(() => {
          fileList.value = []
        }, 100)
      })
    } else {
      window.$message?.error(response.msg || $t('common.importFail'))
      success.value = false
    }
  } catch {
    window.$message?.error('服务器响应格式不正确')
    success.value = false
  }
}

/** 上传失败回调 */
function handleError({ event }: { event?: ProgressEvent }) {
  submitting.value = false
  const responseText = (event?.target as any)?.responseText
  let msg = $t('common.importFail')
  try {
    msg = JSON.parse(responseText).msg || msg
  } catch {}

  window.$message?.error(() => h('div', { innerHTML: msg }))
  success.value = false
}

watch(visible, val => {
  if (val) {
    fileList.value = []
    success.value = false
    hasImported.value = false
    submitting.value = false
    message.value = ''
    importResult.value = null
  }
})
</script>

<template>
  <NModal
    v-model:show="visible"
    :title="$t('common.import')"
    preset="card"
    :bordered="false"
    :mask-closable="false"
    class="max-w-90% w-650px"
    @close="closeDrawer"
  >
    <NUpload
      ref="uploadRef"
      :file-list="fileList"
      :action="`${baseURL}/business/referral/v1/import`"
      :headers="headers"
      :max="1"
      accept=".xls,.xlsx"
      :default-upload="false"
      @update:file-list="handleFileListChange"
      @before-upload="beforeUpload"
      @finish="handleFinish"
      @error="handleError"
    >
      <NUploadDragger>
        <div class="mb-12px flex-center">
          <icon-material-symbols:upload-rounded class="text-48px opacity-40" />
        </div>
        <NText class="text-16px">点击或拖拽文件到此处上传</NText>
        <NP depth="3" class="mt-8px text-center">
          支持格式：
          <b class="text-primary">xls/xlsx</b>
          ， 行数限制：
          <b class="text-red-500">1000行以内</b>
        </NP>
      </NUploadDragger>
    </NUpload>

    <!-- 导入结果展示 -->
    <div v-if="importResult" class="mt-20px">
      <NAlert :type="importResult.failCount > 0 ? 'warning' : 'success'" :title="message" :bordered="false">
        <div class="mb-10px">
          处理完成：共
          <b>{{ importResult.totalCount }}</b>
          条， 成功
          <b class="text-green-600">{{ importResult.successCount }}</b>
          条， 失败
          <b class="text-red-600">{{ importResult.failCount }}</b>
          条。
        </div>

        <!-- 错误明细列表 -->
        <NScrollbar v-if="importResult.errorRows?.length" class="max-h-240px">
          <NList bordered size="small" class="bg-white/50 dark:bg-black/20">
            <NListItem v-for="(row, idx) in importResult.errorRows" :key="idx">
              <div class="flex items-start gap-3 text-13px">
                <NTag size="small" type="error" :bordered="false" class="mt-2px">第 {{ row.excelRowNum }} 行</NTag>
                <div class="flex-1">
                  <div class="mb-1px text-red-500 font-bold">{{ row.errorMessage }}</div>
                  <div class="text-12px text-gray-500">
                    项目：{{ row.projectName || '-' }} | 客户：{{ row.customerName || '-' }}({{
                      row.customerPhoneNumber || '-'
                    }})
                  </div>
                </div>
              </div>
            </NListItem>
          </NList>
        </NScrollbar>
      </NAlert>
    </div>

    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton quaternary :disabled="submitting" @click="handleDownloadTemplate">
          <template #icon><icon-material-symbols:download-rounded /></template>
          {{ $t('common.downloadTemplate') }}
        </NButton>
        <NButton type="primary" :loading="submitting" :disabled="fileList.length === 0" @click="handleSubmit">
          {{ $t('common.import') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
