<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NPopover, NSelect, NSpin, NTag } from 'naive-ui'
import { fetchGetUnreferencedProjects, fetchUpdateReferral } from '@/service/api/business/referral'

defineOptions({
  name: 'ReferralProjectEditor'
})

interface Props {
  row: Api.Business.Referral
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update'): void
  (e: 'clickName', name: string): void
}>()

const visible = ref(false)
const projectOptions = ref<any[]>([])
const projectLoading = ref(false)
const projectTotal = ref(0)
const projectPageNum = ref(1)
const projectSearchQuery = ref('')
const updating = ref(false)

async function handleSearchProject(query: string) {
  projectSearchQuery.value = query
  projectPageNum.value = 1
  projectLoading.value = true
  const { data: res, error } = await fetchGetUnreferencedProjects({
    projectName: query,
    pageNum: 1,
    pageSize: 10
  })
  if (!error && res) {
    projectOptions.value = res.rows
    projectTotal.value = res.total
  }
  projectLoading.value = false
}

async function handleProjectScroll(e: any) {
  const target = e.target
  if (!target) return
  const { scrollHeight, scrollTop, clientHeight } = target
  if (
    scrollHeight - scrollTop - clientHeight < 50 &&
    !projectLoading.value &&
    projectOptions.value.length < projectTotal.value
  ) {
    projectPageNum.value += 1
    projectLoading.value = true
    const { data: res, error } = await fetchGetUnreferencedProjects({
      projectName: projectSearchQuery.value,
      pageNum: projectPageNum.value,
      pageSize: 10
    })
    if (!error && res) {
      projectOptions.value = [...projectOptions.value, ...res.rows]
    }
    projectLoading.value = false
  }
}

async function handleUpdateProject(val: string | number) {
  if (!val) return

  updating.value = true
  const { error } = await fetchUpdateReferral({
    id: props.row.id,
    projectId: val as CommonType.IdType
  })

  if (!error) {
    window.$message?.success('项目关联更新成功')
    visible.value = false
    emit('update')
  }
  updating.value = false
}

function handleOpen() {
  handleSearchProject('')
}
</script>

<template>
  <div class="group flex-center justify-center gap-6px">
    <NButton type="primary" text class="font-bold underline" @click="emit('clickName', row.projectName)">
      {{ row.projectName }}
    </NButton>

    <NTag v-if="row.projectDeleted === '1'" type="error" size="small" :bordered="false">已删除</NTag>

    <NPopover
      v-if="row.projectDeleted !== '1' && row.customerDeleted !== '1' && row.referralDeleted !== '1'"
      v-model:show="visible"
      trigger="click"
      placement="bottom"
      :width="300"
      @update:show="val => val && handleOpen()"
    >
      <template #trigger>
        <div
          class="cursor-pointer p-2px text-primary opacity-40 transition-all group-hover:opacity-100 hover:opacity-100"
        >
          <icon-material-symbols:swap-horizontal-circle-outline-rounded class="text-18px" />
        </div>
      </template>

      <NSpin :show="updating">
        <div class="flex-col gap-8px p-4px">
          <div class="mb-4px text-center text-12px text-gray-400 font-bold">关联新项目</div>
          <NSelect
            filterable
            remote
            placeholder="输入项目名搜索"
            :options="projectOptions.map(p => ({ label: p.projectName, value: p.id }))"
            :loading="projectLoading"
            @search="handleSearchProject"
            @scroll="handleProjectScroll"
            @update:value="handleUpdateProject"
          />
        </div>
      </NSpin>
    </NPopover>
  </div>
</template>

<style scoped></style>
