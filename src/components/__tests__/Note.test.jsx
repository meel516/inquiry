// Link.react.test.js
import React from 'react';
import Note from '../Note';
import renderer from 'react-test-renderer';

describe('note component testing', () => {

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
            <Note 
                labelId="additionalLabel"
                label="Additional Notes" 
                id="additionalNotes" 
                handleChange={handleChange} 
                handleBlur={handleBlur} 
                isReadOnly={false}
            />
        )
        let output = component.toJSON();
        expect(output).toMatchSnapshot();
    })

})
