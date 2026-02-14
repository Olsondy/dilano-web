# I18N_LOCALIZATION_WORKFLOW (国际化工作流)

## 1. 核心架构
项目使用 `vue-i18n` 实现国际化，支持动态切换。

- **主入口**: `src/locales/index.ts`
- **词条目录**: `src/locales/langs/` (主要包含 `zh-cn.ts` 和 `en-us.ts`)。

## 2. 国际化范围
- **静态词条**: 页面标题、按钮文本。
- **动态路由/菜单**: 通过 `routeStore.updateGlobalMenusByLocale` 在语言切换时同步更新菜单标题。
- **第三方库**:
  - **Naive UI**: 见 `src/locales/naive.ts` 进行组件库适配。
  - **Day.js**: 见 `src/locales/dayjs.ts` 进行时间格式化适配。

## 3. 开发规范
- 页面中使用 `$t('key')` 或 `i18n.t('key')`。
- 业务词条命名建议遵循 `module.component.element` 规范。
