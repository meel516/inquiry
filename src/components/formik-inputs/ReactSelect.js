import React, { useMemo } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';
import { useOnChangeWrapper, useOnBlurWrapper } from './hooks';

export const ReactSelect = ({
    name,
    options,
    onChange,
    onBlur,
    disabled = false,
}) => {
    const { status: { readOnly }} = useFormikContext();
    const [ field, meta ] = useField(name);
    const handleChange = useOnChangeWrapper(name, field, onChange, x => x.value);
    const handleBlur = useOnBlurWrapper(name, field, onBlur);
    const { value } = field;

    const selected = useMemo(() => {
        return options.find(x => x.value === value) || '';
    }, [value, options]);

    return (
        <>
            <Select
                value={selected}
                options={options}
                onChange={handleChange}
                name={name}
                id={name}
                isDisabled={disabled || readOnly}
                onBlur={handleBlur}
            />
            { meta.touched && meta.error ? (
                <Alert color="danger" className="alert-smaller-size">{meta.error}</Alert>
            ) : null}
        </>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
}