import React from 'react';
import {checkForDuplicate} from '../SalesServices';

test('fetcing communities via api service', () => {
  const contact = {
    firstName: 'Kris',
    lastName: 'Bryant',
    email: 'Kris.Bryant@gmail.com'
  }
  return checkForDuplicate(contact)
    .then(res => res.json())
    .then((data) => {
      expect(data).toBe('')
    })
})
