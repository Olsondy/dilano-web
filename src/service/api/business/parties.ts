import { request } from '@/service/request'

/** Get party list */
export function fetchGetPartyList(data?: Api.Business.PartySearchParams) {
  return request<Api.Business.PartyList>({
    url: '/business/parties/v1/list',
    method: 'post',
    data
  })
}

/** Get party detail */
export function fetchGetPartyDetail(id: CommonType.IdType) {
  return request<Api.Business.Party>({
    url: `/business/parties/v1/${id}`,
    method: 'post'
  })
}

/** Add party */
export function fetchAddParty(data: Api.Business.PartyOperateParams) {
  return request<null>({
    url: '/business/parties/v1/',
    method: 'post',
    data
  })
}

/** Update party */
export function fetchUpdateParty(data: Api.Business.PartyOperateParams) {
  return request<null>({
    url: '/business/parties/v1/',
    method: 'put',
    data
  })
}

/** Delete party */
export function fetchDeleteParty(ids: CommonType.IdType[]) {
  return request<null>({
    url: `/business/parties/v1/${ids}`,
    method: 'delete'
  })
}

/** Get party by phone (for validation) */
export function fetchGetPartiesByPhone(params: { phoneNumber: string }) {
  return request<Api.Business.Party>({
    url: `/business/parties/v1/phone`,
    method: 'get',
    params
  })
}
