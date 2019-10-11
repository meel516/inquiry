import * as Yup from 'yup';

//let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const emailSchema = Yup.string()
  .email("Email must be valid")
  .max(100, 'Email can be at most 100 characters')

const influencerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .max(50, 'First Name can be at most 50 characters')
  ,
  lastName: Yup.string()
    .required('Last Name is required')
    .max(50, 'Last Name can be at most 50 characters')
  ,
  phone: Yup.object().shape({
    number: Yup.string().notRequired().test('influencerPhoneValid', 'Influencer Phone is not Valid', function (value) {
      if (!!value) {
        const schema = Yup.string().matches(phoneRegExp, 'Invalid Phone Number');
        return schema.isValidSync(value);
      }
      return true;
    })
  }),
  email: emailSchema,
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
});

const prospectSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .max(50, 'First Name can be at most 50 characters')
  ,
  lastName: Yup.string()
    .required('Last Name is required')
    .max(50, 'Last Name can be at most 50 characters')
  ,
  veteranStatus: Yup.string().required('Veteran Status is required'),
  email: emailSchema,
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
});

const secondPersonSchema = Yup.object().shape({
  selected: Yup.boolean(),
  firstName: Yup.string()
    .max(50, 'First Name can be at most 50 characters')
    .when(
      'selected', {
        is: true,
        then: Yup.string().required('First Name is required')
      })
  ,
  lastName: Yup.string()
    .max(50, 'Last Name can be at most 50 characters')
    .when(
      'selected', {
        is: true,
        then: Yup.string().required('Last Name is required')
      }
    )
  ,
  email: emailSchema,
});

function noteSchema(name, maxlength) {
  return Yup.string().max(maxlength, `${name} can be at most 4000 characters`)
}

const formValidationSchema = Yup.object().shape({
  lead: Yup.object().shape({
    influencer: influencerSchema,
    prospect: prospectSchema,
    secondPerson: secondPersonSchema,
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
      situation: noteSchema('Situation', 4000),
      passionsPersonality: noteSchema('Passions & Personality', 4000),
      financialSituation: noteSchema('Financial Situation', 4000),
      additionalNotes: noteSchema('Additional Notes', 4000),
      secondPerson: noteSchema('2nd Person Situation', 4000),
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

export {
  formValidationSchema,
  secondPersonSchema,
  influencerSchema,
  prospectSchema,
  emailSchema,
  noteSchema,
};