/*
since this export is not default... on the import you need to do ... import { duplicateCheck } from '../services/duplicateCheck' this is because we don't have a default export
just a normal export
*/
const SALES_SERVICES_URL = 'https://sales-services.uat.assisted.com';

export function duplicateCheck(contact, address) {
  const endpoint = window.encodeURI(`${SALES_SERVICES_URL}/ContactService/api/v1/contacts/validations/duplicateCheck`);

  const payload = {
    "address1":{
      "line1":"",
      "line2":"",
      "city":"",
      "state":"",
      "zip":""
    },
    "emailAddress":"Kris.Bryant@gmail.com",
    "firstName":"Kris",
    "lastName":"Bryant",
    "phones":[
      {
      "extension":"",
      "intlPhoneNbr":"",
      "phoneNbr":"4149185000",
      "phoneType":"WORK"
    }
    ]
  }

  fetch(endpoint, {method:'POST', headers: { 'Content-Type': 'application/json'
  }, mode: 'cors', cache: 'no-cache', body: JSON.stringify(payload)})
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));

}

function getSalesLead(leadId) {
  var uri = `${SALES_SERVICES_URL}/Sims/api/leads/${leadId}`
  return fetch(uri, {})
}
