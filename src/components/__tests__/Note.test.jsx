// Link.react.test.js
import React from 'react';
import { Note } from '../Note';
import { shallow } from 'enzyme'

describe('note component testing', () => {
    test('verify note rendering', () => {
        expect(shallow(<Note 
            name='lead.notes.additionalNotes'
            label="Additional Notes"
            isReadOnly={false}
        />)).toMatchSnapshot();
    })

})
