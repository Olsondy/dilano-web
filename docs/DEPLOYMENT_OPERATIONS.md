# DEPLOYMENT_OPERATIONS (部署运维)

## 1. 运行时配置 (Runtime Config)
这是本项目最重要的部署特性，支持**不重新打包修改 API 地址**。

- **逻辑位置**: `build/config-generator.js`
- **产物位置**: `dist/app.config.js`
- **运维操作**: 部署后直接修改 `dist/app.config.js` 中的 `window.APP_CONFIG` 即可更改后端地址。

## 2. 构建命令
| 环境 | 命令 | 依据文件 |
| :--- | :--- | :--- |
| 开发 | `pnpm dev` | `.env.dev` |
| 测试 | `pnpm build:test` | `.env.test` |
| 生产 | `pnpm build` | `.env.prod` |

## 3. Nginx 关键配置
- **单页应用**: 必须配置 `try_files $uri $uri/ /index.html;` 以支持 History 模式。
- **反向代理**: 若 `VITE_SERVICE_BASE_URL` 为 `/api`，需在 Nginx 中配置对应的 `location /api/`。
