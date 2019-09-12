import React from 'react';
import { checkForDuplicate, createEmptyLead, createProspectRequest } from '../SalesServices';


test('Test creation of empty lead', () => {
  expect(createEmptyLead()).toEqual({
    influencer: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: {
        number: "",
        type: ""
      },
      address: {
        addressLine1: "",
        addressLine2: "",
      },
    },
    secondPerson: {
      firstName: "",
      lastName: "",
      phone: {
        number: "",
        type: ""
      },
    },
    prospect: {
      firstName: "",
      lastName: "",
      email: "",
      phone: {
        number: "",
        type: ""
      }
    },
    leadSource: "",
    leadSourceDetail: "",
    notes: {
    },
    nextSteps: "",
  })
})