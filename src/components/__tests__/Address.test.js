import React from 'react';

import Address from '../Address';
import { ObjectMappingService } from '../../services/Types'
import { create } from 'react-test-renderer'

describe.skip('Address Test', () => {
  test('testing address component', () => {
    const address = ObjectMappingService.createEmptyAddress();

    const mockOnChange = jest.fn();

    let tree = create(<Address type="influencer" address={address} onChange={mockOnChange} />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
