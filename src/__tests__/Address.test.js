import React from 'react';
import Address from '../components/Address';
import { create } from 'react-test-renderer'

describe('Address Test',()=> {
    test('testing address component', () => {
      const address = {

      }

      const mockOnChange = jest.fn();

      let tree = create(<Address type="influencer" address={address} onChange={mockOnChange}/>)
      expect(tree.toJSON()).toMatchSnapshot();
  })
})
