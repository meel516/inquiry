import React from 'react';
import Address from '../Address';
import { create } from 'react-test-renderer'

describe.skip('Address Test', () => {
  test('testing address component', () => {
    let tree = create(<Address basePath='lead.influencer' />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
