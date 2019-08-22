import React from 'react';
import Address from '../components/Address';
import { create } from 'react-test-renderer'

describe('Address Test',()=>{
    test('testing address class', () => {
    let tree = create(<Address />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
