import { string } from 'yup';
import { isEmpty } from 'lodash';

const resultOfCallsWithTransactionDetails = new Set([
    '3', // nonqualified lead
    '4', // Non Lead Call
]);
const requiredCommunityResultOfCallOptions = new Set([
    '1', // Visit/Assessment/Home Visit Scheduled
    '2', // New Lead No Visit
    '5', // Special Event RSVP
])

const SMS_FUACTION_SEAC = 52; // Special Event at Community - SMS Follow Up Action

export const resultOfCallRequiresTransactionDetails = roc => resultOfCallsWithTransactionDetails.has(roc);

export const digitLengthLessThan = (max) => {
    return function (value) {
        return value === undefined ? true : value.toString().length <= max;
    }
}

export function nonZeroNumber (value) {
    const val = typeof(value) !== 'number'
        ? parseInt(value)
        : value;
    
    return !isNaN(val) && val !== 0;
}

export function phoneNumberValidator (value) {
    if (!!value) {
      const schema = string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number');
      return schema.isValidSync(value);
    }
    return true;
}

const getDuplicateCommunitiesErrors = (communities) => {
    if (!Array.isArray(communities) || communities.length < 2) {
        return new Array(communities.length).fill(null);
    }

    const selections = new Set();
    return communities.reduce((acc, item) => {
      const { communityId } = item;
      const error = communityId !== 0 && selections.has(communityId)
        ? ({ communityId: 'You have added a duplicate community' })
        : null;
      selections.add(communityId);
      return (acc.push(error), acc);
    }, []);
}

const getCommunityErrors = (community) => {
    const errors = {};
    const { communityId, note, followUpAction, followupDate, eventDetail, eventAddlDetail } = community;

    if (!communityId)
        errors.communityId = 'Community is required';

    if (note && note.length > 4000)
        errors.note = 'Description can be at most 4000 characters';

    if (followUpAction) {
        if (!followupDate)
            errors.followupDate = 'Next Steps Date is required';
        
        if (!note || !note.trim())
            errors.note = 'Description is required';
        
        if (parseInt(followUpAction) === SMS_FUACTION_SEAC) {
            if (!eventDetail || eventDetail === 0)
                errors.eventDetail = 'Event Detail is required'

            if (!eventAddlDetail || eventAddlDetail === 0)
                errors.eventAddlDetail = "Event Add'l Detail is required"
        }
    }

    return isEmpty(errors) ? null : errors;
}

export const getCommunitiesErrors = (communities) => {
    const duplicateErrors = getDuplicateCommunitiesErrors(communities);
    const fieldErrors = communities.map(getCommunityErrors)
    return duplicateErrors.map((dupeError, i) => {
        const errors = { ...dupeError, ...fieldErrors[i] };
        return isEmpty(errors) ? null : errors;
    });
}

export const getRequiredCommunityError = (communities, resultOfCall) => {
    if (requiredCommunityResultOfCallOptions.has(resultOfCall) && !communities.length) {
        return "The Result of Call selection requires a community to be added";
    }
    return null;
}
