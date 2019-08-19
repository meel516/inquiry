/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
const SALES_SERVICES_URL = 'http://sales-services.assisted.com';

export function duplicateCheck(contact) {
  const endpoint = window.encodeURI(`${SALES_SERVICES_URL}/ContactService/api/v1/contacts/validations/duplicateCheck`);


}

function getSalesLead(leadId) {
  var uri = `${SALES_SERVICES_URL}/Sims/api/leads/${leadId}`
  return fetch()
}
