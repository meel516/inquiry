import { get } from '../request'
import {
    createDropDownUrl,
    createLeadSourceDropDownUrl,
    createLeadSourceSubDetailDropDownUrl,
    createReasonsUrl,
    createDestinationsUrl,
} from '../../constants/url-generator'
import dropdownTypes from '../../constants/dropdown-types'

export const getDropdowns = (url) => get(url).then((res) => res.json());
export const getAddressStates = () => getDropdowns(createDropDownUrl(dropdownTypes.stateProv));

/**
 * Cache of the lead sources
 * @type {undefined | Promise}
 */
let ilsCache = undefined;


/**
 * Load all lead sources/details/sub-details (the "tree")in a single shot, and put that Promise into a cache for future use.
 * @returns {Promise} Promise with the entire JSON tree
 */
function loadLeadSources() {
    if (ilsCache === undefined) {
        ilsCache = getDropdowns(createDropDownUrl(dropdownTypes.inquiryLeadSourceTree));
    }
    return ilsCache;
}

/**
 * Get all the lead sources
 * @returns {Promise<*[]>}
 */
export const getLeadSources = async () => {
    const result = [];
    const leadSources = (await loadLeadSources()).leadSources;
    for (const sourceId in leadSources) {
        if (leadSources.hasOwnProperty(sourceId)) {
            result.push({
                value: sourceId,
                text:  leadSources[sourceId].description
            });
        }
    }
    result.sort((a, b) => a.text.localeCompare(b.text));
    return result;
};

/**
 * Get all the lead source details for the given source
 * @param sourceId the source's ID
 * @returns {Promise<*[]>}
 */
export const getLeadSourceDetails = async (sourceId) => {
    const sourceIdNum = toNumber(sourceId);
    const result = [];
    const leadSourceDetails = (await loadLeadSources()).leadSourceDetails;
    for (const detailId in leadSourceDetails) {
        if (leadSourceDetails.hasOwnProperty(detailId)) {
            const detail = leadSourceDetails[detailId];
            if (detail.sourceId === sourceIdNum) {
                result.push({
                    value: String(detailId),
                    text:  leadSourceDetails[detailId].description
                });
            }
        }
    }
    result.sort((a, b) => a.text.localeCompare(b.text));
    return result;
};

/**
 * Get all the lead source sub-details for the given detail
 * @param detailId the lead source detail's ID
 * @returns {Promise<*[]>}
 */
export const getLeadSourceSubDetails = async (detailId) => {
    const detailIdNum = toNumber(detailId);
    const result = [];
    const leadSourceAdditionalDetails = (await loadLeadSources()).leadSourceAdditionalDetails;
    for (const subDetailId in leadSourceAdditionalDetails) {
        if (leadSourceAdditionalDetails.hasOwnProperty(subDetailId)) {
            const subDetail = leadSourceAdditionalDetails[subDetailId];
            if (subDetail.sourceDetailId === detailIdNum) {
                result.push({
                    value: String(subDetailId),
                    text:  leadSourceAdditionalDetails[subDetailId].description
                });
            }
        }
    }
    result.sort((a, b) => a.text.localeCompare(b.text));
    return result;
};
export const getPhoneTypes = () => getDropdowns(createDropDownUrl(dropdownTypes.phoneTypes));
export const getInquiryTypes = () => getDropdowns(createDropDownUrl(dropdownTypes.inquiryTypes));
export const getVeteranStatus = () => getDropdowns(createDropDownUrl(dropdownTypes.veteranStatus));
export const getDecisionTimeframe = () => getDropdowns(createDropDownUrl(dropdownTypes.decisionTimeframe));
export const getReasonForInterest = () => getDropdowns(createDropDownUrl(dropdownTypes.interestReason));
export const getCurrentSituation = () => getDropdowns(createDropDownUrl(dropdownTypes.currentSituation));
export const getCareTypes = () => getDropdowns(createDropDownUrl(dropdownTypes.careTypes));
export const getFollowupActions = () => getDropdowns(createDropDownUrl(dropdownTypes.followUpActions));
export const getReasons = (statusId) => getDropdowns(createReasonsUrl(statusId));
export const getDestinations = (reasonId) => getDropdowns(createDestinationsUrl(reasonId));
export const getResultOfCall = () => getDropdowns(createDropDownUrl(dropdownTypes.resultOfCall));
export const getEventDetails = (eventId) => getDropdowns(createLeadSourceDropDownUrl(dropdownTypes.inquiryLeadSource, eventId));
export const getEventAddlDetails = (eventDetailId) => getDropdowns(createLeadSourceSubDetailDropDownUrl(dropdownTypes.inquiryLeadSourceDetail, eventDetailId));

/**
 * Get the numeric value of the given input
 * @param s the input string or number
 * @returns {number} the number result
 */
function toNumber(s) {
    if (typeof s === "number") {
        return s;
    } else {
        return parseInt(s, 10);
    }
}
