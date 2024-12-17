import React from 'react';
import PropTypes from 'prop-types';
import NumberFormatBase from 'react-number-format';
import { Alert } from 'reactstrap';
import { useField, useFormikContext } from 'formik';
import { useHandleChange, useHandleBlur } from './hooks';

export const NumberFormat = ({ name, className, disabled, onChange, onBlur, ...props }) => {
    const { status: { readOnly }} = useFormikContext();
    const [ field, meta ] = useField(name);
    const classes = `form-control${className ? ` ${className}` : ''}`;
    const handleChange = useHandleChange(field, onChange);
    const handleBlur = useHandleBlur(field, onBlur);

    return (
        <>
            <Number
                { ...props }
                { ...field }
                id={name}
                className={classes}
                format='(###) ###-####'
                mask='_'
                name={name}
                disabled={disabled || readOnly}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            { meta.touched && meta.error ? (
                <Alert color='danger' className='alert-smaller-size'>{meta.error}</Alert>
            ) : null} 
        </>
    )
}

NumberFormat.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}