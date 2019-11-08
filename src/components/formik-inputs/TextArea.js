import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { useField, useFormikContext } from 'formik';

export const TextArea = ({
    name,
    onChange,
    className,
    disabled = false,
    ...props
}) => {
    const { status: { readOnly }} = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((e) => {
        field.onChange(e);
        if (typeof(onChange) === 'function') {
            onChange(e);
        }
    }, [onChange, field]);

    return (
        <Input
            type='textarea'
            name={name}
            id={name}
            onChange={handleChange}
            disabled={disabled || readOnly}
            className={className}
            { ...props }
            { ...field }
        />
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}