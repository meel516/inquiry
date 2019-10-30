import dropdownTypes from '../dropdown-types'
import reactAppSalesServicesUrl from './react-app-sales-services-url'

export const createDropDownUrl = (type) => `${reactAppSalesServicesUrl()}/Sims/api/dropdowns/${type}`
export const createLeadSourceDropDownUrl = (type, leadSourceId) => `${createDropDownUrl(type)}/${leadSourceId}/inquiryLeadSourceDetails`
