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
    const { status: { readOnly }} = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((option) => {
        // Create a fake event so Formik's change handler also calls 'setFieldValue' at the end of this function:
        // https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx#L548-L598
        field.onChange({ target: { name, value: option.value }});
        if (typeof(onChange) === 'function') {
            onChange(option);
        }
    }, [name, field, onChange]);

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