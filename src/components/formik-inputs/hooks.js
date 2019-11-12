import { useCallback } from 'react';

// These hooks are used on third-party react components that do not expose the raw event object from event handlers.
// The 'name' field is attached to the event target so Formik's field handlers work as expected.

export const useOnChangeWrapper = (name, field, onChange, valueXform = x => x) => {
    const handleChange = useCallback((value) => {
        // Create a fake event so Formik's change handler also calls 'setFieldValue' at the end of this function:
        // https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx#L548-L598
        field.onChange({ target: { name, value: valueXform(value) }});
        if (typeof(onChange) === 'function') {
            onChange(value);
        }
    }, [onChange, name, field, valueXform]);

    return handleChange;
}

export const useOnBlurWrapper = (name, field, onBlur) => {
    const handleBlur = useCallback((e) => {
        field.onBlur({ ...e, target: { ...e.target, name } });
        if (typeof(onBlur) === 'function') {
            onBlur(e);
        }
    }, [field, name, onBlur]);

    return handleBlur;
}