import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Input } from 'reactstrap';
import { useField, useFormikContext } from 'formik';
import { useHandleChange, useHandleBlur } from './hooks';

export const TextArea = ({
    name,
    onChange,
    onBlur,
    className,
    disabled = false,
    ...props
}) => {
    const { status: { readOnly }} = useFormikContext();
    const [ field, meta ] = useField(name);
    const handleChange = useHandleChange(field, onChange);
    const handleBlur = useHandleBlur(field, onBlur);

    return (
        <>
            <Input
                { ...props }
                { ...field }
                type='textarea'
                name={name}
                id={name}
                disabled={disabled || readOnly}
                className={className}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            { meta.touched && meta.error ? (
                <Alert color='danger' className='alert-smaller-size'>{meta.error}</Alert>
            ) : null}
        </>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
}