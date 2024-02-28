import reactAppSalesServicesUrl from './react-app-sales-services-url'

export const createDropDownUrl = (type) => `${reactAppSalesServicesUrl()}/Sims/api/dropdowns/${type}`
export const createLeadSourceDropDownUrl = (type, leadSourceId) => `${createDropDownUrl(type)}/${leadSourceId}/inquiryLeadSourceDetails`
export const createLeadSourceSubDetailDropDownUrl = (type, leadSourceDetailId) => `${createDropDownUrl(type)}/${leadSourceDetailId}/inquiryLeadSourceSubDetails`
export const createCommunitiesFetchUrl = () => `${reactAppSalesServicesUrl()}/CommunitySearch/service/searchByAppAndUser`
export const createDuplicateSearchUrl = () => `${reactAppSalesServicesUrl()}/Sims/api/contact/duplication`
export const createReasonsUrl = (statusId) => `${reactAppSalesServicesUrl()}/Sims/api/reasons/byStatus/${statusId}`
export const createDestinationsUrl = (reasonId) => `${reactAppSalesServicesUrl()}/Sims/api/reasons/${reasonId}/destinations`
export const createStatusUpdateUrl = () => `${reactAppSalesServicesUrl()}/Sims/api/autoStatusUpdate`
export const createSfmcCallAuditUrl = () => `${reactAppSalesServicesUrl()}/Sims/api/ccApp/sfmc`
export const fetchBuildingDetailUrl = (buildingId) => `${reactAppSalesServicesUrl()}/CommunitySearch/service/getHealthPlus?buildingId=${buildingId}`
