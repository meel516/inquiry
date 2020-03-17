import React, { useContext } from 'react';

// See usage in InquiryMinForm
// Used as a replacement for Formik's useFormikContext when using values that don't change on every keystroke (not values, touched, or errors)
// Also attached other relevant flags not from formik's context

export const FormikContextWrapper = React.createContext();

export const useFormikContextWrapper = () => {
    const wrappedContext = useContext(FormikContextWrapper);
    return wrappedContext;
}