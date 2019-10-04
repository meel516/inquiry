import * as Yup from 'yup';
import { ObjectMappingService } from '../../services/Types'

/**
 * This is the inquiry form's Yup validation schema
 */
const schema = Yup.object().shape({
    lead: Yup.object().shape({
        influencer: Yup.object().shape({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            // phone: Yup.object().shape({
            //   number: Yup.string().phone("Invalid Phone Number"),
            //   number: Yup.string().matches(phoneRegExp, 'Invalid Phone Number').notRequired()         
            // }),
            // email: Yup.string().email("Email must be valid"),
        }),
        prospect: Yup.object().shape({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            veteranStatus: Yup.string().required('Veteran Status is required'),
            // phone: Yup.object().shape({
            //   number: Yup.string().matches({phoneRegExp})          
            // }),a
            // email: Yup.string().email(),
        }),
        umid: Yup.string().required("UMID is required"),
        careType: Yup.string().required("Care Level Recommended is required"),
        fua: Yup.string().required("Result of Call is required"),
        callingFor: Yup.string().required('Calling For is required'),
        inquiryType: Yup.string().required('Inquiry Method is required'),
        leadSource: Yup.string().required('Lead Source is required'),
        leadSourceDetail: Yup.string().required('Lead Source Detail is required'),
        callerType: Yup.string().required('Gender of Caller is required'),
    })
})

describe('Yup validation checks', () => {
    let lead = null;

    beforeEach(() => {
        lead = ObjectMappingService.createEmptyLead()
    })

    test('test schema validity', () => {
        
    })

    test('perform validation on empty form', async () => {
        await schema.validate(lead, {abortEarly: false})
    })
})
