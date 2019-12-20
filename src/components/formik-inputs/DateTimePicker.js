import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datetime-picker';
import { Alert } from 'reactstrap';
import { useField, useFormikContext } from 'formik';
import { useOnChangeWrapper, useOnBlurWrapper } from './hooks';

export const DateTimePicker = ({
    name,
    onChange,
    onBlur,
    disabled = false,
    ...props
}) => {
    const { status: { readOnly } } = useFormikContext();
    const [ field, meta ] = useField(name);
    const handleChange = useOnChangeWrapper(name, field, onChange);
    const handleBlur = useOnBlurWrapper(name, field, onBlur);

    return (
        <>
            <DatePicker
                { ...props }
                id={name}
                name={name}
                disabled={disabled || readOnly}
                onChange={handleChange}
                onBlur={handleBlur}
                value={field.value}
                calendarType="US"
                showWeekNumbers={false}
            />
            { meta.touched && meta.error ? (
                <Alert color='danger' className='alert-smaller-size'>{meta.error}</Alert>
            ) : null}
        </>
    )
}

DateTimePicker.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}