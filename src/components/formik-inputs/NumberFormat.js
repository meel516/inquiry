import React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format'; // Use NumericFormat for formatting
import { Alert } from 'reactstrap';
import { useField, useFormikContext } from 'formik';
import { useHandleChange, useHandleBlur } from './hooks';

export const NumberFormat = ({ name, className, disabled, onChange, onBlur, ...props }) => {
    const { status: { readOnly } = {} } = useFormikContext(); // Handle potential undefined status
    const [field, meta] = useField(name);
    const classes = `form-control${className ? ` ${className}` : ''}`;
    const handleChange = useHandleChange(field, onChange);
    const handleBlur = useHandleBlur(field, onBlur);

    return (
        <>
            <NumericFormat
                {...props}
                {...field}
                id={name}
                className={classes}
                format="(###) ###-####" // Apply phone number format
                mask="_"
                name={name}
                disabled={disabled || readOnly}
                onValueChange={(values) => {
                    // Custom handling for onValueChange
                    const { value } = values; // Extract raw numeric value
                    handleChange({ target: { name, value } });
                }}
                onBlur={handleBlur}
            />
            {meta.touched && meta.error && (
                <Alert color="danger" className="alert-smaller-size">
                    {meta.error}
                </Alert>
            )}
        </>
    );
};

NumberFormat.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

export default NumberFormat;
