# ROUTING_PERMISSION_MODEL (路由与权限管理)

## 1. 核心架构
项目采用 `vue-router` + `elegant-router` 插件实现类型安全的路由管理。支持 **Static (前端固定)** 和 **Dynamic (后端动态)** 两种权限模式。

- **模式切换**: 见 `.env` 中的 `VITE_AUTH_ROUTE_MODE`。
- **状态管理**: `src/store/modules/route/index.ts`。

## 2. 权限校验流程 (src/router/guard/route.ts)
路由守卫采用多层异步初始化逻辑：

1.  **Constant Route 初始化**: 检查 `isInitConstantRoute`，若未完成则先加载登录、404 等基础路由。
2.  **登录态校验**: 检查 `localStg` 中的 `token`。未登录则重定向至 `/login?redirect=...`。
3.  **Auth Route 初始化**: 
    - **静态模式**: 依据 `src/router/routes/index.ts` 中的配置，按用户 `roles` 进行前端过滤。
    - **动态模式**: 调用 `fetchGetRoutes` 接口获取后端定义的菜单树，并动态生成路由记录。
4.  **角色匹配**: 校验 `to.meta.roles` 是否包含当前用户的角色。

## 3. 菜单与面包屑生成
- 菜单数据通过 `getGlobalMenusByAuthRoutes` 从路由表中提取，过滤 `hideInMenu` 的项。
- 支持 `i18nKey` 国际化标题映射。
