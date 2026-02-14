# UI_DESIGN_GUIDE (UI 规范)

## 1. 主题配置
系统视觉核心由 `Naive UI` + `UnoCSS` 驱动。

- **配置文件**: `src/theme/settings.ts` (默认主题、布局模式、主色调)。
- **样式变量**: `src/theme/vars.ts` (CSS 变量提取与 Naive UI 主题覆盖)。

## 2. 视觉特征 (UnoCSS)
- **预设**: 见 `uno.config.ts`，定义了快捷类（shortcuts）如 `flex-center`。
- **暗黑模式**: 逻辑位于 `src/store/modules/theme`，支持 `dark` 模式切换，通过 `html.dark` 类名控制。

## 3. 核心布局
- **BaseLayout**: `src/layouts/base-layout/index.vue`，集成了侧边栏、顶栏和多页签控制。
