import { get } from '../request'
import {
    createDropDownUrl,
    createLeadSourceDropDownUrl,
    createLeadSourceSubDetailDropDownUrl,
    createLostClosedReasonsUrl,
    createLostClosedDestinationsUrl,
} from '../../constants/url-generator'
import dropdownTypes from '../../constants/dropdown-types'

export const getDropdowns = (url) => get(url).then((res) => res.json()) 
export const getAddressStates = () => getDropdowns(createDropDownUrl(dropdownTypes.stateProv))
export const getLeadSources = () => getDropdowns(createDropDownUrl(dropdownTypes.inquiryLeadSource))
export const getLeadSourceDetails = (sourceId) => getDropdowns(createLeadSourceDropDownUrl(dropdownTypes.inquiryLeadSource, sourceId))
export const getLeadSourceSubDetails = (detailId) => getDropdowns(createLeadSourceSubDetailDropDownUrl(dropdownTypes.inquiryLeadSourceDetail, detailId))
export const getPhoneTypes = () => getDropdowns(createDropDownUrl(dropdownTypes.phoneTypes))
export const getInquiryTypes = () => getDropdowns(createDropDownUrl(dropdownTypes.inquiryTypes))
export const getVeteranStatus = () => getDropdowns(createDropDownUrl(dropdownTypes.veteranStatus))
export const getDecisionTimeframe = () => getDropdowns(createDropDownUrl(dropdownTypes.decisionTimeframe))
export const getReasonForInterest = () => getDropdowns(createDropDownUrl(dropdownTypes.interestReason))
export const getCurrentSituation = () => getDropdowns(createDropDownUrl(dropdownTypes.currentSituation))
export const getCareTypes = () => getDropdowns(createDropDownUrl(dropdownTypes.careTypes))
export const getFollowupActions = () => getDropdowns(createDropDownUrl(dropdownTypes.followUpActions))
export const getLostClosedReasons = (statusId) => getDropdowns(createLostClosedReasonsUrl(statusId))
export const getLostClosedDestinations = (reasonId) => getDropdowns(createLostClosedDestinationsUrl(reasonId))
export const getResultOfCall = () => getDropdowns(createDropDownUrl(dropdownTypes.resultOfCall))
