# Dilano Admin

DILANO ADMIN Enterprise Management Solution.

Modern management system frontend built with **Vue 3** + **Vite** + **TypeScript** + **Naive UI** + **UnoCSS**.

**[简体中文](./README.zh-CN.md)**

## Prerequisites

- **Node**: >=20.19.0
- **pnpm**: >=10.5.0

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🔐 Configuration

This project implements a **Git-ignored secrets + Runtime dynamic injection** strategy.

### Developer Guide

1. The project includes a base configuration `.env`. **Do NOT enter private keys here.**
2. Create your local configuration by copying the template:
   ```bash
   cp .env.example .env.dev
   ```
3. Fill in your development keys (e.g., RSA Keys, Client ID) in `.env.dev`.
4. Run `pnpm dev` to start.

### 📦 Build & Deploy

This project supports **Build Once, Run Anywhere**.

#### 1. Build
To build for ANY environment, simply run:
```bash
pnpm build
```
*The build artifact will include configurations from `.env.prod` by default.*

#### 2. Multi-Environment Deployment
The generated `dist` directory contains an `app.config.js` file, which holds all runtime configurations (API URLs, keys, etc.).

*   **Production**: Deploy `dist` directly. No changes needed.
*   **Test/Staging**: Deploy `dist`, then modify `app.config.js` on the server to switch configurations (or overwrite it via CI/CD scripts).

> **Note**: Thanks to this mechanism, you don't need to rebuild for different environments, ensuring consistency and saving build time.
