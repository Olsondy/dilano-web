import { request } from '@/service/request'

/** 新增客户报备 */
export function fetchMerageReferral(data: Api.Business.ReferralOperateParams) {
  return request<boolean>({
    url: '/business/referral/v1',
    method: 'post',
    data
  })
}

/** 批量删除客户报备 */
export function fetchBatchDeleteReferral(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/business/referral/v1/${ids.join(',')}`,
    method: 'delete'
  })
}

/** 获取客户报备列表 */
export function fetchGetReferralList(params?: Api.Business.ReferralSearchParams) {
  const { pageNum, pageSize, orderByColumn, isAsc, ...data } = params || {}
  return request<Api.Business.ReferralList>({
    url: '/business/referral/v1/list',
    method: 'post',
    data,
    params: { pageNum, pageSize, orderByColumn, isAsc }
  })
}

/** 获取客户报备详情 */
export function fetchGetReferral(id: CommonType.IdType) {
  return request<Api.Business.ReferralDetail>({
    url: `/business/referral/v1/${id}`,
    method: 'get'
  })
}

/** 手机号获取客户信息 */
export function fetchGetPartiesByPhone(params: { phoneNumber: string }) {
  return request<Api.Business.CustomerParams>({
    url: `/business/parties/v1/phone`,
    method: 'get',
    params
  })
}
