import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

export const ReactSelect = ({
    name,
    options,
    onChange,
    disabled = false,
}) => {
    const { setFieldValue, status: { readOnly } } = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((option) => {
        setFieldValue(name, option.value);
        if (typeof(onChange) === 'function') {
            onChange(option);
        }
    }, [name, onChange, setFieldValue]);

    return (
        <Select
            options={options}
            onChange={handleChange}
            name={name}
            id={name}
            disabled={disabled || readOnly}
            onBlur={field.onBlur}
        />
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}