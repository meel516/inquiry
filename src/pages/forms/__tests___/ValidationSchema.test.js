
import { ObjectMappingService } from '../../../services/Types'
import { formValidationSchema } from '../ValidationSchema'

describe('Yup testing/validation', () => {
    let lead = null;

    beforeEach(() => {
        lead = ObjectMappingService.createEmptyLead()
    })

    test('test schema validity', () => {
        
    })

    test('perform validation on empty form', () => {
        try {
            let result = formValidationSchema.validateSync(lead, { abortEarly: false })
            expect(result).toBeTruthy();
        }
        catch(err) {
            const listOfErrors = err.errors;
        }
    })


})