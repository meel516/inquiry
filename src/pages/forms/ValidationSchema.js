import * as Yup from 'yup';

const phonePhoneTypeDependencySchema = Yup.object().shape({
  phone: Yup.object().shape({
    type: Yup.string()
      .when('number', {
        is: number => number != '',
        then: Yup.string().required("Phone Type is required when Phone is entered"),
        otherwise: Yup.string()
      }),
    number: Yup.string().when('type', {
      is: type => type != '',
      then: Yup.string().required("Phone is required when Phone Type is entered"),
      otherwise: Yup.string()
    }),
  }, ['number', 'type'])
});

const conditionalValidationSchema = Yup.object().shape({
  lead: Yup.object().shape({
    influencer: phonePhoneTypeDependencySchema,
    prospect: phonePhoneTypeDependencySchema,
    secondPerson: phonePhoneTypeDependencySchema,
  }),
})

const mainFormValidationSchema = Yup.object().shape({
  lead: Yup.object().shape({
    influencer: Yup.object().shape({
      firstName: Yup.string()
        .required('First Name is required')
        .max(50, 'First Name can be at most 50 characters')
      ,
      lastName: Yup.string()
        .required('Last Name is required')
        .max(50, 'Last Name can be at most 50 characters')
      ,
      phone: Yup.object().shape({
        number: Yup.string().notRequired().test('influencerPhoneValid', 'Phone is not Valid', function (value) {
          if (!!value) {
            const schema = Yup.string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number');
            return schema.isValidSync(value);
          }
          return true;
        })
      }),
      email: Yup.string()
        .email("Email must be valid")
        .max(100, 'Email can be at most 100 characters')
      ,
      address: Yup.object().shape({
        line1: Yup.string()
          .max(40, 'Address 1 can be at most 40 characters')
        ,
        line2: Yup.string()
          .max(40, 'Address 2 can be at most 40 characters')
        ,
        city: Yup.string()
          .max(30, 'City can be at most 30 characters')
        ,
      }),
    }),
    prospect: Yup.object().shape({
      firstName: Yup.string()
        .required('First Name is required')
        .max(50, 'First Name can be at most 50 characters')
      ,
      lastName: Yup.string()
        .required('Last Name is required')
        .max(50, 'Last Name can be at most 50 characters')
      ,
      veteranStatus: Yup.string().required('Veteran Status is required'),
      phone: Yup.object().shape({
        number: Yup.string().notRequired().test('influencerPhoneValid', 'Phone is not Valid', function (value) {
          if (!!value) {
            const schema = Yup.string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number');
            return schema.isValidSync(value);
          }
          return true;
        })
      }),
      email: Yup.string()
        .email("Email must be valid")
        .max(100, 'Email can be at most 100 characters')
      ,
      address: Yup.object().shape({
        line1: Yup.string()
          .max(40, 'Address 1 can be at most 40 characters')
        ,
      }),
      age: Yup.number()
        .transform((cv, ov) => {
          return (ov === '' ? undefined : cv);
        })
        .test('len', 'Age can be at most 3 digits', function (val) {
          if (!(typeof val != "undefined")) {
            // This is undefined...return true.
            return true;
          } else {
            return (val && val.toString().length < 4);
          }
        }),
    }),
    secondPerson: Yup.object().shape({
      firstName: Yup.string()
        .max(50, 'First Name can be at most 50 characters')
      ,
      lastName: Yup.string()
        .max(50, 'Last Name can be at most 50 characters')
      ,
      phone: Yup.object().shape({
        number: Yup.string().notRequired().test('influencerPhoneValid', 'Phone is not Valid', function (value) {
          if (!!value) {
            const schema = Yup.string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number');
            return schema.isValidSync(value);
          }
          return true;
        })
      }),
      email: Yup.string()
        .email("Email must be valid")
        .max(100, 'Email can be at most 100 characters')
      ,
    }),
    additionalDetail: Yup.string()
      .max(100, 'Additional Detail can be at most 100 characters')
    ,
    umid: Yup.string()
      .required("UMID is required")
      .max(36, 'UMID can be at most 36 characters')
    ,
    careType: Yup.string().required("Care Level Recommended is required"),
    fua: Yup.string().required("Result of Call is required"),
    callingFor: Yup.string().required('Calling For is required'),
    inquiryType: Yup.string().required('Inquiry Method is required'),
    leadSource: Yup.string().required('Lead Source is required'),
    leadSourceDetail: Yup.string().required('Lead Source Detail is required'),
    callerType: Yup.string().required('Gender of Caller is required'),
    notes: Yup.object().shape({
      situation: Yup.string()
        .max(4000, 'Situation can be at most 4000 characters')
      ,
      passionsPersonality: Yup.string()
        .max(4000, 'Passions & Personality can be at most 4000 characters')
      ,
      financialSituation: Yup.string()
        .max(4000, 'Financial Situation can be at most 4000 characters')
      ,
      additionalNotes: Yup.string()
        .max(4000, 'Additional Notes can be at most 4000 characters')
      ,
      secondPerson: Yup.string()
        .max(4000, '2nd Person Situation can be at most 4000 characters')
      ,
    }),
  }),
  communities: Yup.array().of(
    Yup.object().shape({
      note: Yup.string()
        .max(4000, 'Description can be at most 4000 characters')
      ,
    }),
  )
})

const formValidationSchema = mainFormValidationSchema.concat(conditionalValidationSchema);

export {
  formValidationSchema,
};