import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Input as ReactstrapText } from 'reactstrap';
import { useField, useFormikContext } from 'formik';
import { useHandleChange, useHandleBlur } from './hooks';

export const Input = ({
    name,
    onChange,
    onBlur,
    ...props
}) => {
    const { status: { readOnly }} = useFormikContext();
    const [ field, meta ] = useField(name);
    const handleChange = useHandleChange(field, onChange);
    const handleBlur = useHandleBlur(field, onBlur);

    const checkboxProps = props.type === 'checkbox'
        ? { checked: field.value }
        : {};

    return (
        <>
            <ReactstrapText
                { ...props }
                { ...field }
                { ...checkboxProps }
                id={name}
                name={name}
                disabled={props.disabled || readOnly}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            { meta.touched && meta.error ? (
                <Alert color='danger' className='alert-smaller-size'>{meta.error}</Alert>
            ) : null}
        </>
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}