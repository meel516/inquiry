import {numToString} from '../../utils/misc';

/**
 * Creates an Eloqua contact from a sales contact with some optional additional key/value pairs
 */
export default (salesContact = {}, additionalValues = {}) => {
	return ({
		contactId:     salesContact?.contactId,
		firstName:     salesContact.firstName,
		lastName:      salesContact.lastName,
		gender:        salesContact.gender,
		emailAddress:  salesContact.email,
		age:           salesContact.age,
		veteranStatus: numToString(salesContact.veteranStatus),
		textOptInInd:  salesContact.textOptInCheckbox, ...additionalValues
	})
}
