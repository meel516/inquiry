import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input as ReactstrapText } from 'reactstrap';
import { useField, useFormikContext } from 'formik';

export const Input = ({
    name,
    onChange,
    ...props
}) => {
    const { status: { readOnly }} = useFormikContext();
    const [ field ] = useField(name);
    const handleChange = useCallback((e) => {
        field.onChange(e);
        if (typeof(onChange) === 'function') {
            onChange(e);
        }
    }, [name, field, onChange]);

    return (
        <ReactstrapText
            id={name}
            name={name}
            disabled={props.disabled || readOnly}
            { ...field }
            { ...props }
            onChange={handleChange}
        />
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}