# API_REQUEST_ARCHITECTURE (请求架构)

## 1. 核心机制
项目采用环境变量驱动的请求模式，支持单/多服务切换。

- **逻辑核心**: `src/utils/service.ts`
- **基础路径**: 
  - 优先读取 `window.APP_CONFIG.VITE_SERVICE_BASE_URL` (运行时)。
  - 回退读取 `import.meta.env.VITE_SERVICE_BASE_URL` (编译时)。

## 2. 环境适配 (src/utils/service.ts)
- **开发代理**: 当 `VITE_HTTP_PROXY=Y` 时，请求会转发至 `vite.config.ts` 定义的代理路径。
- **多服务路由**: 依据 `VITE_OTHER_SERVICE_BASE_URL` (JSON 格式) 映射不同的 ServiceName 到对应 BaseURL。

## 3. 请求拦截
- **成功码**: 依据 `backendConfig.successCode` (通常为 `0` 或 `200`)。
- **Token 失效**: 状态码 401 时自动触发 `logout` 并清理 `src/store/modules/auth` 中的状态。
