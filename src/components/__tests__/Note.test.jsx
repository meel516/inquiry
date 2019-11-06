// Link.react.test.js
import React from 'react';
import Note from '../Note';
import { shallow } from 'enzyme'

describe('note component testing', () => {
    test('verify note rendering', () => {
        expect(shallow(<Note 
            labelId="additionalLabel"
            label="Additional Notes" 
            id="additionalNotes" 
            handleChange={() => {}} 
            handleBlur={() => {}} 
            isReadOnly={false}
        />)).toMatchSnapshot();
    })

})
