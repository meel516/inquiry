import { string } from 'yup';

export const digitLengthLessThan = (max) => {
    return function (value) {
        return value === undefined ? true : value.toString().length <= max;
    }
}

export function nonZeroNumber (value) {
    const val = typeof(value) !== 'number'
        ? parseInt(value)
        : value;
    
    return !isNaN(val) && val !== 0;
}

export function phoneNumberValidator (value) {
    if (!!value) {
      const schema = string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number');
      return schema.isValidSync(value);
    }
    return true;
}