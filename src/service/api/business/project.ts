import { request } from '@/service/request'

/** 获取项目信息列表 */
export function fetchGetProjectList(params?: Api.Business.ProjectSearchParams) {
  const { pageNum, pageSize, orderByColumn, isAsc, ...data } = params || {}
  return request<Api.Business.ProjectList>({
    url: '/business/project/v1/list',
    method: 'post',
    data,
    params: { pageNum, pageSize, orderByColumn, isAsc }
  })
}

/** 新增项目信息 */
export function fetchCreateProject(data: Api.Business.ProjectOperateParams) {
  return request<boolean>({
    url: '/business/project/v1',
    method: 'post',
    data
  })
}

/** 修改项目信息 */
export function fetchUpdateProject(data: Api.Business.ProjectOperateParams) {
  return request<boolean>({
    url: '/business/project/v1',
    method: 'put',
    data
  })
}

/** 批量删除项目信息 */
export function fetchBatchDeleteProject(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/project/v1/${ids.join(',')}`,
    method: 'delete'
  })
}

/** 修改项目短信发送/系统通知开关 */
export function fetchUpdateSwtichValue(data: Api.Business.ProjectOperateParams, switchType: string) {
  return request<boolean>({
    url: `/business/project/v1/changeSmsSwitchVal/${switchType}`,
    method: 'put',
    data
  })
}

/** 修改项目报价 */
export function fetchUpdateProjectPrice(id: CommonType.IdType, quotedPrice: number) {
  return request<boolean>({
    url: `/business/project/v1/${id}/price`,
    method: 'put',
    params: { quotedPrice }
  })
}
