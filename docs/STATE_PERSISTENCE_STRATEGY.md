# STATE_PERSISTENCE_STRATEGY (状态持久化策略)

## 1. 持久化工具 (src/utils/storage.ts)
项目通过 `localStg` 和 `sessionStg` 封装了原生的 `localStorage` 和 `sessionStorage`。

- **加密机制**: 默认使用 `crypto-js` 对敏感信息进行加密（如 Token、用户信息），加密 Key 定义在环境变量或 `src/constants` 中。
- **存储类型**: 强类型约束见 `src/typings/storage.d.ts`。

## 2. 关键持久化数据
| 数据项 | 存储位置 | 生命周期 | 对应 Store |
| :--- | :--- | :--- | :--- |
| **Auth Token** | Local | 长期 | `src/store/modules/auth` |
| **主题设置** | Local | 长期 | `src/store/modules/theme` |
| **多页签 (Tabs)** | Session | 浏览器会话 | `src/store/modules/tab` |
| **用户偏好** | Local | 长期 | `src/store/modules/app` |

## 3. 状态恢复逻辑
各 Pinia Store 在初始化时会通过 `localStg.get` 获取初始值，确保刷新页面后 UI 状态（如侧边栏收起、暗黑模式）保持一致。
