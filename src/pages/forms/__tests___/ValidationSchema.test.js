import * as Yup from 'yup';

import { ObjectMappingService } from '../../../services/Types'
import { formValidationSchema } from '../ValidationSchema'

describe('Yup full integration testing/validation', () => {
    let lead = null;

    beforeEach(() => {
        lead = ObjectMappingService.createEmptyLead()
    })

    test('test schema validity', () => {

    })

    test('perform validation on empty form - verify default validation messages are listed', () => {
        const defaultRequired = [
            "First Name is required",   // this is called twice [prospect|influencer]
            "Last Name is required",    // this is called twice [prospect|influencer]
            "Veteran Status is required",
            "UMID is required",
            "Care Level Recommended is required",
            "Drivers at least one check box is required",
            "Result of Call is required",
            "Calling For is required",
            "Reason For Call is required",
            "Inquiry Method is required",
            "Lead Source Detail is required",
            "Lead Source is required",
            "Gender of Caller is required",
        ]

        formValidationSchema.validate(lead, { abortEarly: false })
            .catch((err) => {
                const required = err.errors;
                expect(required).not.toBeNull()

                for (let i = 0; i < required.length; i++) {
                    let error = required[i];
                    let isRequired = defaultRequired.includes(error)
                    expect(isRequired).toBeTruthy()
                }
            })
    })

})

describe('test verify when condition for second person contact', () => {

    test('test case when second person is not selected', async () => {

        const lead = ObjectMappingService.createEmptyLead();
        const { secondPerson } = lead;
        expect(secondPerson).not.toBeNull();

        expect(secondPerson.selected).toBeFalsy();

        // change selected to be true - should expect name to be required
        secondPerson.selected = true;
        expect(secondPerson.selected).toBeTruthy();
    })

})

describe('test 2 level validation', () => {
/* 
    test('test validation from 2nd level', () => {

        const schema = Yup.object().shape({
            lead: Yup.object().shape({
                prospect: Yup.object().shape({
                    firstName: Yup.string()
                        .max(50, 'First Name can be at most 50 characters')
                        .when('../callingFor', {
                            is: (callingFor) => callingFor !== 'MySelf',
                            then: Yup.string().required('First name is required')
                        }),

                    lastName: Yup.string()
                        .max(50, 'First Name can be at most 50 characters')
                }),
                callingFor: Yup.string()
            })
        });

        const values = {
            lead: {
                prospect: {
                    firstName: "",
                    lastName: "",
                },
                callingFor: "MySelf",
            }
        }

        schema.validate(values, { abortEarly: false })
            .catch((err) => {
                console.log(`Error: ${err}`);
            })
    }) */

    test('test lead source conditional validation', () => {

        const schema = Yup.object().shape({
            lead: Yup.object().shape({
                leadSource: Yup.string().required('Lead Source is required'),
                leadSourceDetail: Yup.string()
                    .when('leadSource', {
                        is: (val) => (!!val),
                        then: Yup.string().required('Lead Source Detail is required')
                    })
            })
        });

        const values = {
            lead: {
                leadSource: 25,
                leadSourceDetail: '' ,
            }
        }

        schema.validate(values, {abortEarly: false})
            .catch((err) => {
                const required = err.errors;
                expect(required).not.toBeNull()

                expect(required[0]).toEqual('Lead Source Detail is required')
            })
    })
})