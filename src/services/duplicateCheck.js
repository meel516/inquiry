/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
export function duplicateCheck(contact) {
  const endpoint = window.encodeURI('http://sales-services.assisted.com/ContactService/api/v1/contacts/validations/duplicateCheck');
}
