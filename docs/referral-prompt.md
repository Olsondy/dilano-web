# Role

你是一个精通vue3 NaiveUI Unocss的前端工程师

## Contenxt

新增一个客户报备页面.实现以下任务

## Task1

src/views下目录新增目录和文件customer/referral/index.vue, 项目会自动生成路由

## Task2

页面进入展示,上面条件查询, 下面表格, 表格列显示字段: 客户名称、 客户手机号、 项目名称、项目佣金、 报备人、 报备人联系方式、 报备时间、  备注
参考字段名json:

```json
{
  "customerId": 1,
  "customerName": "string",
  "customerPhoneNumber": "string",
  "projectId": 1,
  "projectName": "string",
  "rebateCommission": 987.22,
  "referralId": "string",
  "referralPhoneNumber"："string",
  "referralName": "string",
  "referralChannel": "string",
  "createTime": "2026-01-15T18:17:27.008Z"
}
```

## Task3

   点击新增按钮, 新增客户报备信息, 整体表单容器分3块区域展示, 布局为2个输入框占容器一行:

- 第一块表单区域, 标题显示客户信息, 表单填写项包含: 客户名称(必填)、客户手机号(必填)、客户地址(必填), 客户固定电话(非必填)
  - 下方新增一个折叠区域补充填写客户联系人信息, 至少添加一个;  包含的字段有, 联系人名称(必填)、联系人电话(必填),联系人邮箱(非必填) , 是否首要联系人(switch选择, 有多个联系人时), 联系人备注(非必填);  可新增多个客户联系人(每行后面有个加号按钮可以继续新增，最多添加三个)
- 第二块表单区域, 标题显示项目信息, 表单填写项包含: 项目名称(搜索框,输入后按项目名称远程搜索, 选择后带出项目其他信息)、项目佣金, 石材类型, 项目进度,项目进度状态(正常/超时).
  - 主要逻辑: 选择项目时, 带出的信息均无法编辑. 如搜索框搜索不到, 用户可以直接输入内容,其他项目关联的输入框可输入内容(均为必填)
- 第三块表单区域, 标题显示报备人信息, 表单填写项包含: 报备人名称(必填)、报备人手机号(必填)、 报备渠道(非必填)、备注(非必填,500字限制).
参考json

```json
{
    "project": {
        "projectName": "",
        "stoneTypeList": [
            ""
        ],
        "rebateCommission": 1,
        "projectPhase": "",
        "phaseTimeout": ""
    },
    "customer": {
        "partyName": "",
        "phoneNumber": "",
        "address": "",
        "landline": ""
    },
    "customerContacts": [
        {
            "contactName": "",
            "contactPhone": "",
            "contactEmail": "",
            "preferred": "",
            "memos": ""
        }
    ],
    "referralName": "",
    "referralPhoneNumber": "",
    "referralChannel": "",
    "referralRemarks": ""
}
```
