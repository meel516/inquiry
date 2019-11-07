import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datetime-picker';
import { useField, useFormikContext } from 'formik';

export const DateTimePicker = ({
    name,
    onChange,
    disabled = false,
    ...props
}) => {
    const { status: { readOnly } } = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((date) => {
        // Create a fake event so Formik's change handler also calls 'setFieldValue' at the end of this function:
        // https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx#L548-L598
        field.onChange({ target: { name, value: date }});
        if (typeof(onChange) === 'function') {
            onChange(date);
        }
    }, [onChange, name]);

    return (
        <DatePicker
            id={name}
            name={name}
            disabled={disabled || readOnly}
            onChange={handleChange}
            onBlur={field.onBlur}
            value={field.value}
            { ...props }
        />
    )
}

DateTimePicker.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}