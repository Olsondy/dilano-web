/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace Business
   *
   * backend api module: "Business"
   */
  namespace Business {
    /** project */
    type Project = Common.CommonRecord<{
      /** 主键id */
      id: CommonType.IdType
      /** 项目名 */
      projectName: string
      /** 石材类型(鱼肚白、鱼肚灰、潘多拉等) */
      stoneType: string
      /** 石材类型列表 */
      stoneTypeList: string[]
      /** 报价 */
      quotedPrice: number
      /** 返点佣金比例 */
      rebateCommission: number
      rebateCommissionRate: number
      /** 项目阶段(已测量、已报价、已签合同) */
      projectPhase: string
      /** 发生短信通知开关(0关闭 1开启) */
      sendSmsSwitch: Common.SwitchStatus
      /** 超时状态系统提醒（0关闭 1开启) */
      timeOutSwitch: Common.SwitchStatus
      phaseTimeout: Common.TimeoutStatus
    }>

    /** project search params */
    type ProjectSearchParams = CommonType.RecordNullable<
      Pick<Api.Business.Project, 'projectName' | 'stoneTypeList' | 'projectPhase' | 'phaseTimeout'> &
        Api.Common.CommonSearchParams
    >

    /** project operate params */
    type ProjectOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Business.Project,
        | 'id'
        | 'projectName'
        | 'stoneTypeList'
        | 'quotedPrice'
        | 'rebateCommissionRate'
        | 'projectPhase'
        | 'sendSmsSwitch'
        | 'timeOutSwitch'
      >
    >

    /** project list */
    type ProjectList = Api.Common.PaginatingQueryRecord<Project>

    /** referral */
    type Referral = Common.CommonRecord<{
      /** id */
      id: CommonType.IdType
      /** 客户id */
      customerId: number
      /** 客户名称 */
      customerName: string
      /** 客户类型 */
      partyType: string
      /** 客户手机号 */
      customerPhoneNumber: string
      /** 项目id */
      projectId: number
      /** 项目名称 */
      projectName: string
      /** 项目佣金 */
      rebateCommission: number
      /** 项目佣金比例 */
      rebateCommissionRate: number
      /** 报备人id */
      referralId: string
      /** 报备人联系方式 */
      referralPhoneNumber: string
      /** 报备人名称 */
      referralName: string
      /** 报备渠道 */
      referralChannel: string
      /** 备注 */
      remarks: string
    }>

    /** referral search params */
    type ReferralSearchParams = CommonType.RecordNullable<
      Pick<Referral, 'customerName' | 'customerPhoneNumber' | 'projectName' | 'referralName'> &
        Api.Common.CommonSearchParams
    >

    /** referral list */
    type ReferralList = Api.Common.PaginatingQueryRecord<Referral>

    /** customer contact */
    interface CustomerContact {
      contactName: string
      contactPhone: string
      contactEmail: string
      preferred: string
      memos: string
    }

    /** referral detail - matches backend flat structure but extends for frontend usage */
    type ReferralDetail = Referral & {
      customerContacts: CustomerContact[]
      customerAddress?: string
      customerLandline?: string
    }

    interface CustomerParams {
      /** 主键 */
      id?: string | number

      /** 客户/推荐人名称 */
      partyName: string

      /** 客户类型（1=客户，2=推荐人） */
      partyType: string

      /** 手机号 */
      phoneNumber: string

      /** 固定电话 */
      landline?: string

      /** 客户/推荐人地址 */
      address?: string

      /** 客户联系人列表 */
      customerContacts?: CustomerContact[]
    }

    /** referral operate params */
    interface ReferralOperateParams {
      id?: CommonType.IdType
      project: {
        id: CommonType.IdType
        projectName: string
        stoneTypeList: string[]
        quotedPrice: number
        rebateCommissionRate: number
        projectPhase: string
        phaseTimeout: string
      }
      customer: {
        id: CommonType.IdType
        partyName: string
        phoneNumber: string
        address: string
        landline: string
      }
      customerContacts: CustomerContact[]
      referral: {
        id: CommonType.IdType
        partyName: string
        phoneNumber: string
        address: string
      }
      referralChannel: string
      remarks: string
    }

    /** party (customer/referral info) */
    type Party = Common.CommonRecord<{
      id: CommonType.IdType
      partyName: string
      partyType: string
      phoneNumber: string
      landline: string
      address: string
      projectName?: string
      customerContacts?: CustomerContact[]
    }>

    /** party search params */
    type PartySearchParams = CommonType.RecordNullable<
      Pick<Party, 'partyName' | 'phoneNumber' | 'partyType'> & {
        /** create time range */
        createTime?: [string, string]
      } & Api.Common.CommonSearchParams
    >

    /** party operate params */
    type PartyOperateParams = CommonType.RecordNullable<
      Pick<Party, 'id' | 'partyName' | 'partyType' | 'phoneNumber' | 'landline' | 'address' | 'customerContacts'>
    >

    /** party list */
    type PartyList = Api.Common.PaginatingQueryRecord<Party>
  }
}
