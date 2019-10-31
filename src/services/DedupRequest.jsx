//  TODO: Remove this if no longer needed
class DedupRequest {

  constructor(contact) {
    this.contact = contact;
  }

  getAddress() {
    if (this.address) {
      return {
        "line1": "",
        "line2": "",
        "city": "",
        "state": "",
        "zip": ""
      }
    } else {
      return {}
    }
  }

  get payload() {
    return {
      "address1": this.getAddress(),
      "emailAddress": "Kris.Bryant@gmail.com",
      "firstName": "Kris",
      "lastName": "Bryant",
      "phones": [
        {
          "extension": "",
          "intlPhoneNbr": "",
          "phoneNbr": "4149185000",
          "phoneType": "WORK"
        }
      ]
    }
  }
}

export default DedupRequest;
