# BUSINESS_MODULE_MAP (业务模块图谱)

## 1. 目录组织规范
每个业务模块遵循统一的四层结构，以 `Project` (项目管理) 为例：

| 层次 | 路径 | 职能 |
| :--- | :--- | :--- |
| **视图层** | `src/views/project/info/` | 页面入口、Search 表单、Operate Drawer 弹窗。 |
| **API 层** | `src/service/api/business/project.ts` | 封装 CRUD 请求（List, Detail, Add, Edit, Delete）。 |
| **类型层** | `src/typings/api/business.api.d.ts` | 定义接口请求参数及响应实体的 TypeScript 类型。 |
| **逻辑/钩子** | `src/hooks/common/table.ts` | 通过 `useTable` 抽象通用表格查询、翻页及导出逻辑。 |

## 2. 核心业务模块映射
| 模块名称 | 路由 Key | API 依据文件 | 主要功能 |
| :--- | :--- | :--- | :--- |
| **客户管理** | `customer_info` | `parties.ts` | 客户基础信息维护、合作关系管理。 |
| **推荐管理** | `customer_referral` | `referral.ts` | 客户推荐关系、返佣及线索追踪。 |
| **项目管理** | `project_info` | `project.ts` | 项目进度、价格编辑器、合同状态跟踪。 |
| **系统监控** | `monitor_*` | `service/api/monitor/` | 登录日志、在线用户、缓存监控。 |
