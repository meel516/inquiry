// Link.react.test.js
import React from 'react';
import Note from '../Note';
import renderer from 'react-test-renderer';

describe.skip('note component testing', () => {

    test('verify note rendering', () => {
        let handleChangeCalled = false,
              handleBlurCalled = false
    
        const handleChange = function() {
            handleChangeCalled = true;
        } 
        const handleBlur = function() {
            handleBlurCalled = true;
        }
    
        const component = renderer.create(
            <Note label="Additional Notes" id="additionalNotes" onChange={handleChange} onBlur={handleBlur} />
        )
        let output = component.toJSON();
        expect(output).toMatchSnapshot();
    })

})
