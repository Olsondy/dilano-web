# Dilano Admin

**[English](./README.md)** | 简体中文

DILANO ADMIN 企业管理解决方案。

基于 **Vue 3** + **Vite** + **TypeScript** + **Naive UI** + **UnoCSS** 构建的现代化管理系统前端。

## 环境要求

- **Node**: >=20.19.0
- **pnpm**: >=10.5.0

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 🔐 配置说明

本项目采用 **Git 忽略敏感配置 + 运行时动态注入** 的管理策略。

### 新人开发指引

1. 项目自带基础配置 `.env`，**请勿在其中填写入私钥**。
2. 复制模版文件创建本地配置：
   ```bash
   cp .env.example .env.dev
   ```
3. 在 `.env.dev` 中填入你的开发环境密钥（向管理员索要 RSA Key 等）。
4. 运行 `pnpm dev` 即可。

### 📦 构建与部署

本项目支持 **Build Once, Run Anywhere**（一次构建，多环境运行）。

#### 1. 构建
无论发布到哪个环境，统一运行：
```bash
pnpm build
```
*构建产物默认携带 `.env.prod` 中的配置。*

#### 2. 多环境部署
构建生成的 `dist` 目录中包含 `app.config.js`，它承载了 API 地址、密钥等所有运行时配置。

*   **生产环境**：直接部署 `dist`，无需修改。
*   **测试/预发环境**：部署 `dist` 后，修改服务器上的 `app.config.js` 即可切换环境配置（或在 CI/CD 中用脚本覆盖该文件）。

> **注意**：得益于此机制，你无需为不同环境重复打包，大大节省了构建时间和版本风险。
