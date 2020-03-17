import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { Select } from '../../formik-inputs';
import { ObjectMappingService } from '../../../services/Types';
import { useFormikContextWrapper } from '../../../hooks';

export const CallingFor = ({ basePath, locked = false }) => {
    const path = `${basePath}.callingFor`;
    const { setFieldValue } = useFormikContextWrapper();

    const onCallingForChange = useCallback((e) => {
        const { value } = e.target;
    
        if (value === 'Myself') {
          setFieldValue(`${basePath}.prospect`, ObjectMappingService.createEmptyContact());
        }
    }, [basePath, setFieldValue]);
      
    return (
        <FormGroup>
            <Label for={path} className="label-format required-field">I am calling for</Label>
            <Select name={path} disabled={locked} onChange={onCallingForChange}>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
            </Select>
        </FormGroup>
    )
}

CallingFor.propTypes = {
    basePath: PropTypes.string.isRequired,
    locked: PropTypes.bool,
}