import { string, number, object, boolean, array } from 'yup';
import { digitLengthLessThan, phoneNumberValidator, nonZeroNumber } from './validators';

const messages = {
  required: {
    firstName: 'First Name is required',
    lastName: 'Last Name is required',
  },
};

const prospectSchema = {
  firstName: string().max(50, 'First Name can be at most 50 characters'),
  lastName: string().max(50, 'Last Name can be at most 50 characters'),
  veteranStatus: string().required('Veteran Status is required'),
  phone: object().shape({
    number: string()
      .notRequired()
      .test('influencerPhoneValid', 'Phone is not Valid', phoneNumberValidator)
  }),
  email: string()
    .email("Email must be valid")
    .max(100, 'Email can be at most 100 characters'),
  address: object().shape({
    line1: string().max(40, 'Address 1 can be at most 40 characters'),
  }),
  age: number()
    .notRequired()
    .test('len', 'Age can be at most 3 digits', digitLengthLessThan(3)),
};

const requiredProspectSchema = {
  ...prospectSchema,
  firstName: string()
    .required(messages.required.firstName)
    .max(50, 'First Name can be at most 50 characters'),
  lastName: string()
    .required(messages.required.lastName)
    .max(50, 'Last Name can be at most 50 characters'),
};

const phonePhoneTypeDependencySchema = object().shape({
  phone: object().shape({
    type: string()
      .when('number', {
        is: number => (number !== '' && number !== undefined && number !== null),
        then: string().required("Phone Type is required when Phone is entered"),
        otherwise: string()
      }),
    number: string().when('type', {
      is: type => (type !== '' && type !== undefined && type !== null),
      then: string().required("Phone is required when Phone Type is entered"),
      otherwise: string()
    }),
  }, ['number', 'type'])
});

const conditionalValidationSchema = object().shape({
  lead: object().shape({
    influencer: phonePhoneTypeDependencySchema,
    prospect: phonePhoneTypeDependencySchema,
    secondPerson: phonePhoneTypeDependencySchema,
  }),
})

const mainFormValidationSchema = object().shape({
  lead: object().shape({
    influencer: object().shape({
      firstName: string()
        .required(messages.required.firstName)
        .max(50, 'First Name can be at most 50 characters'),
      lastName: string()
        .required(messages.required.lastName)
        .max(50, 'Last Name can be at most 50 characters'),
      phone: object().shape({
        number: string()
          .notRequired()
          .test('influencerPhoneValid', 'Phone is not Valid', phoneNumberValidator)
      }),
      email: string()
        .email("Email must be valid")
        .max(100, 'Email can be at most 100 characters'),
      address: object().shape({
        line1: string().max(40, 'Address 1 can be at most 40 characters'),
        line2: string().max(40, 'Address 2 can be at most 40 characters'),
        city: string().max(30, 'City can be at most 30 characters'),
      }),
    }),
    prospect: object().when('callingFor', {
      is: 'Myself',
      then: object().shape(prospectSchema),
      otherwise: object().shape(requiredProspectSchema),
    }),
    secondPerson: object().shape({
      selected: boolean(),
      firstName: string().when('selected', {
        is: true,
        then: string().required(messages.required.firstName).max(50, 'First Name can be at most 50 characters'),
        otherwise: string().max(50, 'First Name can be at most 50 characters'),
      }),
      lastName: string().when('selected', {
        is: true,
        then: string().required(messages.required.lastName).max(50, 'Last Name can be at most 50 characters'),
        otherwise: string().max(50, 'Last Name can be at most 50 characters'),
      }),
      phone: object().shape({
        number: string()
          .notRequired()
          .test('influencerPhoneValid', 'Phone is not Valid', phoneNumberValidator)
      }),
      email: string()
        .email("Email must be valid")
        .max(100, 'Email can be at most 100 characters'),
    }),
    umid: string()
      .required("UMID is required")
      .max(36, 'UMID can be at most 36 characters'),
    careType: number().test('required-number-value', 'Care Level Recommended is required', nonZeroNumber),
    resultOfCall: string().required('Result of Call is required'),
    callingFor: string().required('Calling For is required'),
    inquiryType: number().test('required-number-value', 'Inquiry Method is required', nonZeroNumber),
    leadSource: number().test('required-number-value', 'Lead Source is required', nonZeroNumber),
    leadSourceDetail: number().test('required-number-value', 'Lead Source Detail is required', nonZeroNumber),
    callerType: string().required('Gender of Caller is required'),
    notes: object().shape({
      situation: string().max(4000, 'Situation can be at most 4000 characters'),
      passionsPersonality: string().max(4000, 'Passions & Personality can be at most 4000 characters'),
      financialSituation: string().max(4000, 'Financial Situation can be at most 4000 characters'),
      additionalNotes: string().max(4000, 'Additional Notes can be at most 4000 characters'),
      secondPerson: string().max(4000, '2nd Person Situation can be at most 4000 characters'),
    }),
  }),
  communities: array().of(object()
      .shape({
        note: string().max(4000, 'Description can be at most 4000 characters'),
        communityId: number().test('required-number-value', 'Community is required', nonZeroNumber),
      })
  )
})

const formValidationSchema = mainFormValidationSchema.concat(conditionalValidationSchema);

export {
  phonePhoneTypeDependencySchema,
  conditionalValidationSchema,
  mainFormValidationSchema,
  formValidationSchema,
};