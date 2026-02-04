<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useAppStore } from '@/store/modules/app'
import { useAuthStore } from '@/store/modules/auth'
import defaultAvatar from '@/assets/imgs/default_avatar.png'
import { $t } from '@/locales'

defineOptions({
  name: 'HeaderBanner'
})

const appStore = useAppStore()
const authStore = useAuthStore()

const gap = computed(() => (appStore.isMobile ? 0 : 16))

const getGreeting = computed(() => {
  const userName = authStore.userInfo.user?.nickName || authStore.userInfo.user?.userName
  let msg: App.I18n.I18nKey = 'page.home.morningGreeting'
  const hour = dayjs().hour()
  if (hour >= 12 && hour < 18) {
    msg = 'page.home.afternoonGreeting'
  } else if (hour >= 18 && hour < 22) {
    msg = 'page.home.eveningGreeting'
  } else if (hour >= 22 && hour < 4) {
    msg = 'page.home.lastNightGreeting'
  }
  return $t(msg, {
    userName
  })
})
</script>

<template>
  <NCard :bordered="false" class="card-wrapper">
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:18">
        <div class="flex-y-center">
          <div class="size-72px shrink-0 overflow-hidden rd-1/2">
            <img :src="authStore.userInfo.user?.avatar || defaultAvatar" class="size-full" />
          </div>
          <div class="pl-12px">
            <h3 class="text-18px font-semibold">
              {{ getGreeting }}
            </h3>
            <!-- <p class="text-#999 leading-30px">{{ $t('page.home.weatherDesc') }}</p> -->
          </div>
        </div>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
