import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Input } from 'reactstrap';
import { useField, useFormikContext } from 'formik';
import { useHandleChange, useHandleBlur } from './hooks';

export const Select = ({
    name,
    onChange,
    onBlur,
    children,
    disabled = false,
    placeholder = 'Select One'
}) => {
    const { status: { readOnly } } = useFormikContext();
    const [ field, meta ] = useField(name);
    const handleChange = useHandleChange(field, onChange);
    const handleBlur = useHandleBlur(field, onBlur);
    const props = {
        id: name,
        name,
        disabled: disabled || readOnly,
        onChange: handleChange,
        onBlur: handleBlur,
    };

    return (
        <>
            <Input type='select' { ...field } { ...props }>
                <option value=''>{placeholder}</option>
                {children}
            </Input>
            { meta.touched && meta.error ? (
                <Alert color='danger' className='alert-smaller-size'>{meta.error}</Alert>
            ) : null}
        </>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
}