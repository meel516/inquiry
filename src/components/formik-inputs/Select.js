import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { useField, useFormikContext } from 'formik';

export const Select = ({
    name,
    onChange,
    children,
    disabled = false,
    placeholder = 'Select...'
}) => {
    const { status: { readOnly } } = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((e) => {
        field.onChange(e);
        if (typeof(onChange) === 'function') {
            onChange(e);
        }
    }, [name, onChange, field]);
    const props = {
        id: name,
        name,
        disabled: disabled || readOnly,
        onChange: handleChange,
    };

    return (
        <Input type='select' { ...field } { ...props }>
            {placeholder && (<option value='INPUT_SELECT_PLACEHOLDER'>{placeholder}</option>)}
            {children}
        </Input>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}