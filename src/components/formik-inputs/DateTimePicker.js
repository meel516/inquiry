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
    const { setFieldValue, status: { readOnly } } = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((date) => {
        setFieldValue(name, date);
        if (typeof(onChange) === 'function') {
            onChange(date);
        }
    }, [setFieldValue, onChange, name]);

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