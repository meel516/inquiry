
import { ObjectMappingService } from '../../../services/Types'
import { formValidationSchema } from '../ValidationSchema'

describe('Yup testing/validation', () => {
    let lead = null;

    beforeEach(() => {
        lead = ObjectMappingService.createEmptyLead()
    })

    test('test schema validity', () => {

    })

    test('perform validation on empty form', async () => {
        await formValidationSchema.validate(lead, { abortEarly: false })
    })


})