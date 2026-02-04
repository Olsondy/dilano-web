# DILANO Web - AI Coding Guide

## 项目概述
Vue 3 企业级管理系统，基于 Naive UI，使用 TypeScript + Pinia + Vue Router，支持多租户、RBAC 权限控制、国际化。

## 技术栈
- **框架**: Vue 3.5+ (Composition API + `<script setup>`)
- **语言**: TypeScript 5.8+
- **构建**: Vite 7.0+
- **UI**: Naive UI 2.42+ + UnoCSS 66.3+
- **状态**: Pinia 3.0+
- **路由**: Vue Router 4.5+ + @elegant-router (文件路由)
- **HTTP**: @sa/axios (封装 Axios)
- **包管理**: pnpm 10.5+ (monorepo)

## 目录结构
```
src/
├── views/          # 页面组件（按模块分组：system/monitor/project/tool）
├── layouts/        # 布局组件（base-layout/blank-layout）
├── components/     # 可复用组件（advanced/common/custom）
├── router/         # 路由配置（elegant 自动生成 + guard）
├── store/          # Pinia 状态管理（modules 插件）
├── service/        # API 服务（api 定义 + request 封装）
├── locales/        # 国际化（zh-cn/en-us）
├── hooks/          # 组合式 Hooks（common/business）
├── theme/          # 主题配置
├── styles/         # 全局样式（SCSS）
├── typings/        # TypeScript 类型定义
├── utils/          # 工具函数
├── constants/      # 常量定义
├── enum/           # 枚举定义
├── plugins/        # Vue 插件
└── main.ts         # 入口文件
```

## 编码规范

### 文件命名
- 组件文件: `kebab-case.vue` (如 `data-table.vue`)
- 脚本文件: `kebab-case.ts` (如 `user-service.ts`)
- 类型文件: `kebab-case.d.ts` (如 `app.d.ts`)
- 索引文件: `index.ts` / `index.vue`

### 组件规范
```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'ComponentName'
})

interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

// composition logic
const state = ref('')
const getter = computed(() => ...)
</script>

<template>
  <div class="component">
    {{ props.title }}
  </div>
</template>

<style scoped>
.component {
  /* styles */
}
</style>
```

### Store 规范 (Pinia Setup API)
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStoreName = defineStore('store-id', () => {
  const state = ref()
  
  const getter = computed(() => ...)
  
  function action() {
    // logic
  }
  
  return { state, getter, action }
})
```

### API 服务规范
```typescript
import { request } from '@/service/request'

export function fetchApiName(params: Api.ModuleName.FeatureName.Params) {
  return request<Api.ModuleName.FeatureName.Response>({
    url: '/api/endpoint',
    method: 'post',
    data: params
  })
}
```

### 类型定义规范
- 全局命名空间: `App.*`, `Api.*`, `UnionKey.*`
- API 类型: `src/typings/api.d.ts`
- 组件类型: `src/typings/components.d.ts`

```typescript
declare namespace Api {
  namespace ModuleName {
    namespace FeatureName {
      interface Params {
        id: string
      }
      interface Response {
        data: DataItem[]
      }
    }
  }
}
```

### 路由规范
- 文件路由自动生成，文件位于 `src/views/`
- 路由元信息在文件注释中定义
- 路由守卫位于 `src/router/guard/`

```typescript
/*
 * @description: 页面描述
 * @route: /path/name
 */
```

### 导入规范
- 路径别名: `@/` → `src/`, `~/` → 项目根目录
- 工作区包: `@sa/axios`, `@sa/utils` 等
- 使用具名导入: `import { ref } from 'vue'`

```typescript
// ✅ 正确
import { ref } from 'vue'
import { request } from '@/service/request'
import { fetchUserInfo } from '@/service/api/auth'

// ❌ 错误
import Vue from 'vue'
import * as _ from 'lodash'
```

### 代码风格
- 缩进: 2 空格
- 分号: 无（Prettier 配置）
- 引号: 单引号
- 换行符: LF
- 组件命名: PascalCase（多单词必填）
- 变量命名: camelCase
- 常量命名: UPPER_SNAKE_CASE

## 常用命令

### 开发
```bash
pnpm dev          # 开发环境 (端口 9527)
pnpm dev:prod     # 生产配置开发
pnpm dev:test     # 测试配置开发
```

### 构建
```bash
pnpm build        # 生产构建
pnpm build:dev    # 开发构建
pnpm build:test   # 测试构建
```

### 代码质量
```bash
pnpm typecheck    # TypeScript 类型检查
pnpm lint         # ESLint 检查并修复
pnpm sa gen-route # 生成路由
```

### Git
```bash
pnpm commit       # 使用 commitlint 提交
```

## 关键配置

### 环境变量
- `VITE_APP_TITLE` - 应用标题
- `VITE_AUTH_ROUTE_MODE` - 路由模式（static/dynamic）
- `VITE_ROUTER_HISTORY_MODE` - 路由模式（hash/history/memory）
- `VITE_SERVICE_SUCCESS_CODE` - 后端成功码（默认 200）
- `VITE_HTTP_PROXY` - 启用开发代理（Y/N）
- `VITE_APP_ENCRYPT` - 启用加密（Y/N）

### 路径别名
- `@/*` → `src/*`
- `~/*` → 项目根目录

### 工作区包
- `@sa/axios` - HTTP 请求封装
- `@sa/utils` - 工具函数
- `@sa/hooks` - 组合式 Hooks
- `@sa/materials` - 可复用组件

## 重要约定

1. **组件必为多单词**：除 index/App/Register/[id]/[url] 外，组件名必须多单词
2. **使用 Composition API**：所有新组件使用 `<script setup lang="ts">`
3. **类型安全**：所有函数参数和返回值必须明确类型
4. **状态管理**：使用 Pinia Setup API，不使用 Options API
5. **路由生成**：使用文件路由，手动添加路由后运行 `pnpm sa gen-route`
6. **提交代码前**：必须运行 `pnpm typecheck` 和 `pnpm lint`

## Git Hooks
- **pre-commit**: typecheck + lint + git diff 检查
- **commit-msg**: commitlint 消息验证

## UI 组件库
- **主要**: Naive UI 2.42+
- **原子类**: UnoCSS 66.3+
- **图标**: @iconify/vue
- **主题**: 支持 light/dark/auto，可在主题抽屉配置

## 开发提示

1. **添加新页面**: 在 `src/views/` 对应模块下创建文件，运行 `pnpm sa gen-route`
2. **添加新 API**: 在 `src/service/api/` 对应模块创建文件，定义类型和请求函数
3. **添加新 Store**: 在 `src/store/modules/` 创建文件，使用 Setup API
4. **使用主题变量**: 从 `@sa/theme` 导入，或从 `src/theme/` 查看配置
5. **国际化**: 在 `src/locales/langs/` 添加翻译，使用 `$t()` 或 `useTranslation()`
