
import { ObjectMappingService } from '../../../services/Types'
import { formValidationSchema } from '../ValidationSchema'

describe('Yup testing/validation', () => {
    let lead = null;

    beforeEach(() => {
        lead = ObjectMappingService.createEmptyLead()
    })

    test('test schema validity', () => {
        
    })

    test('perform validation on empty form - verify default validation messages are listed', () => {
        formValidationSchema.validate(lead, { abortEarly: false })
            .catch((err) => {
                const required = err.errors;
                const defaultRequired = [
                    "First Name is required",   // this is called twice [prospect|influencer]
                    "Last Name is required",    // this is called twice [prospect|influencer]
                    "Veteran Status is required",
                    "UMID is required",
                    "Care Level Recommended is required",
                    "Result of Call is required",
                    "Calling For is required",
                    "Inquiry Method is required",
                    "Lead Source Detail is required",
                    "Lead Source is required",
                    "Gender of Caller is required",
                ]
                expect(required).not.toBeNull()

                for (let i = 0; i < required.length; i++) {
                    let error = required[i];
                    let isRequired = defaultRequired.includes(error)
                    expect(isRequired).toBeTruthy()
                }
            })
    })


})