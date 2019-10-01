import * as Yup from 'yup';
import { ObjectMappingService } from '../../services/Types'

/**
 * This is the inquiry form's Yup validation schema
 */
const schema = Yup.object().shape({
    lead: Yup.object().shape({
        influencer: Yup.object().shape({
            firstName: Yup.string().required('Influencer First Name is Required'),
            lastName: Yup.string().required('Influencer Last Name is Required'),
            // phone: Yup.object().shape({
            //   number: Yup.string().phone("Invalid Phone Number"),
            //   number: Yup.string().matches(phoneRegExp, 'Invalid Phone Number').notRequired()         
            // }),
            // email: Yup.string().email("Influencer Email Must Be Valid"),
        }),
        prospect: Yup.object().shape({
            firstName: Yup.string().required('Prospect First Name is Required'),
            lastName: Yup.string().required('Prospect Last Name is Required'),
            veteranStatus: Yup.string().required('Prospect Veteran Status is Required'),
            // phone: Yup.object().shape({
            //   number: Yup.string().matches({phoneRegExp})          
            // }),a
            // email: Yup.string().email(),
        }),
        umid: Yup.string().required("UMID is Required"),
        careType: Yup.string().required("A Care Type is Required"),
        fua: Yup.string().required("Result of Call is Required"),
        callingFor: Yup.string().required('Calling For is Required'),
        inquiryType: Yup.string().required('Inquiry Method is Required'),
        leadSource: Yup.string().required('Lead Source is Required'),
        leadSourceDetail: Yup.string().required('Lead Source Detail is Required'),
        callerType: Yup.string().required('Gender of Caller is Required'),
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
