<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { loginModuleRecord } from '@/constants/app'
// import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import loginBackground from '@/assets/imgs/login_bg.jpg'
// import { $t } from '@/locales'
import PwdLogin from './modules/pwd-login.vue'
import CodeLogin from './modules/code-login.vue'
import Register from './modules/register.vue'
import ResetPwd from './modules/reset-pwd.vue'
import BindWechat from './modules/bind-wechat.vue'

interface Props {
  /** The login module */
  module?: UnionKey.LoginModule
}

const props = defineProps<Props>()

// const appStore = useAppStore()
const themeStore = useThemeStore()

interface LoginModule {
  label: string
  component: Component
}

const moduleMap: Record<UnionKey.LoginModule, LoginModule> = {
  'pwd-login': { label: loginModuleRecord['pwd-login'], component: PwdLogin },
  'code-login': { label: loginModuleRecord['code-login'], component: CodeLogin },
  register: { label: loginModuleRecord.register, component: Register },
  'reset-pwd': { label: loginModuleRecord['reset-pwd'], component: ResetPwd },
  'bind-wechat': { label: loginModuleRecord['bind-wechat'], component: BindWechat }
}

const activeModule = computed(() => moduleMap[props.module || 'pwd-login'])
</script>

<template>
  <div class="relative min-h-screen w-full flex flex-wrap">
    <div class="hidden min-h-screen w-70% lg:block">
      <div class="size-full flex-center">
        <img class="h-full w-full" :src="loginBackground" />
      </div>
    </div>
    <div class="w-full flex-col-center px-24px pt-32px lg:w-30%">
      <div class="mx-auto max-w-464px w-full">
        <header class="flex-y-center justify-between">
          <SystemLogo class="h-100px w-464px text-primary sm:text-42px" />
        </header>
        <main class="pt-24px">
          <div>
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <component :is="activeModule.component" />
            </Transition>
          </div>
        </main>
      </div>
      <div class="relative top-25 flex items-end justify-center">
        <div>
          <span>© {{ new Date().getFullYear() }} DILANO 迪兰诺</span>
          <a
            class="ml-4 font-extrabold hover:underline"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            沪ICP备2025138553号-2
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
