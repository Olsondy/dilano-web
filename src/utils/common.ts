import { AcceptType } from '@/enum/business'
import { $t } from '@/locales'
/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T, T[keyof T]>[]
}

export function transformRecordToNumberOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[]
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string, App.I18n.I18nKey>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label)
  }))
}

/**
 * Toggle html class
 *
 * @param className
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className)
  }

  function remove() {
    document.documentElement.classList.remove(className)
  }

  return {
    add,
    remove
  }
}

/* 驼峰转换下划线 */
export function humpToLine(str: string, line: string = '-') {
  let temp = str.replace(/[A-Z]/g, match => {
    return `${line}${match.toLowerCase()}`
  })
  // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
  if (temp.slice(0, 1) === line) {
    temp = temp.slice(1)
  }
  return temp
}

/** 判断是否为空 */
export function isNotNull(value: any) {
  return value !== undefined && value !== null && value !== ''
}

/** 判断是否为空 */
export function isNull(value: any) {
  return value === undefined || value === null || value === ''
}

/** 判断是否为图片类型 */
export function isImage(suffix: string) {
  return AcceptType.Image.split(',').includes(suffix.toLowerCase())
}

/**
 * 构造树型结构数据
 *
 * @param {T[]} data 数据源
 * @param {TreeConfig} config 配置选项
 * @returns {T[]} 树形结构数据
 */
export const handleTree = <T extends Record<string, any>>(data: T[], config: CommonType.TreeConfig): T[] => {
  if (!data?.length) {
    return []
  }

  const {
    idField,
    parentIdField = 'parentId',
    childrenField = 'children',
    filterFn = () => true // 添加过滤函数，默认为不过滤
  } = config

  // 使用 Map 替代普通对象，提高性能
  const childrenMap = new Map<string | number, T[]>()
  const nodeMap = new Map<string | number, T>()
  const tree: T[] = []

  // 第一遍遍历：构建节点映射
  for (const item of data) {
    const id = item[idField]
    const parentId = item[parentIdField]

    nodeMap.set(id, item)

    if (!childrenMap.has(parentId)) {
      childrenMap.set(parentId, [])
    }
    // 应用过滤函数
    if (filterFn(item)) {
      childrenMap.get(parentId)!.push(item)
    }
  }

  // 第二遍遍历：找出根节点
  for (const item of data) {
    const parentId = item[parentIdField]
    if (!nodeMap.has(parentId) && filterFn(item)) {
      tree.push(item)
    }
  }

  // 递归构建树形结构
  const buildTree = (node: T) => {
    const id = node[idField]
    const children = childrenMap.get(id)

    if (children?.length) {
      // 使用类型断言确保类型安全
      ;(node as any)[childrenField] = children
      for (const child of children) {
        buildTree(child)
      }
    } else {
      // 如果没有子节点，设置为 undefined
      ;(node as any)[childrenField] = undefined
    }
  }

  // 从根节点开始构建树
  for (const root of tree) {
    buildTree(root)
  }

  return tree
}

/**
 * 将对象转换为 URLSearchParams
 *
 * @param obj
 */
export function transformToURLSearchParams(obj: Record<string, any>, excludeKeys: string[] = []) {
  const searchParams = new URLSearchParams()
  if (!isNotNull(obj)) {
    return searchParams
  }
  Object.entries(obj).forEach(([key, value]) => {
    if (excludeKeys.includes(key)) {
      return
    }
    if (typeof value === 'object') {
      transformToURLSearchParams(value).forEach((v, k) => {
        searchParams.append(`${key}[${k}]`, v)
      })
      return
    }
    if (!isNotNull(value)) {
      return
    }
    searchParams.append(key, value)
  })
  return searchParams
}

/** 判断两个数组是否相等 */
export function arraysEqualSet(arr1: Array<any>, arr2: Array<any>) {
  return (
    arr1.length === arr2.length &&
    new Set(arr1).size === arr1.length &&
    new Set(arr2).size === arr2.length &&
    [...arr1].sort().join() === [...arr2].sort().join()
  )
}

/** 处理货币展示 */
export function formatCurrency(value: number, locale: string = 'zh', currency: string = 'CNY'): string {
  // 输入验证
  if (Number.isNaN(value) || value === null || value === undefined) {
    return `0 ${currency}`
  }

  // 设置小数位：如果是整数，最小为 0；否则最小为 0（但最大 4 位会保留实际小数）
  // 注意：对于有小数的数字，minimumFractionDigits: 0 不会强制填充 0，但会保留实际位数（最多 4）
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 0, // 最小 0 位：整数不显示 .00
    maximumFractionDigits: 4 // 最多 4 位：保留小数
    // 如果是整数，可以显式设置为 0，但这里统一用 0 即可处理
  }

  return new Intl.NumberFormat(locale, options).format(value)
}
