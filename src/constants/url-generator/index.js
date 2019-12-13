import reactAppSalesServicesUrl from './react-app-sales-services-url'

export const createDropDownUrl = (type) => `${reactAppSalesServicesUrl()}/Sims/api/dropdowns/${type}`
export const createLeadSourceDropDownUrl = (type, leadSourceId) => `${createDropDownUrl(type)}/${leadSourceId}/inquiryLeadSourceDetails`
export const createLeadSourceSubDetailDropDownUrl = (type, leadSourceDetailId) => `${createDropDownUrl(type)}/${leadSourceDetailId}/inquiryLeadSourceSubDetails`
export const createCommunitiesFetchUrl = () => `${reactAppSalesServicesUrl()}/CommunitySearch/service/searchByAppAndUser`
export const createDuplicateSearchUrl = () => `${reactAppSalesServicesUrl()}/Sims/api/contact/duplication`
export const createEloquaCdoUrl = () => `${reactAppSalesServicesUrl()}/Sims/api/inquiryForm/eloqua`
export const createStatusUpdateUrl = () => `${reactAppSalesServicesUrl()}/Sims/api/statusUpdate`