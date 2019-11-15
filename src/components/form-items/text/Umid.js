import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { Input } from '../../formik-inputs';

export const UMID = ({ basePath, locked = false }) => {
    const path = `${basePath}.umid`;

    return (
        <FormGroup>
            <Label for={path} className="label-format required-field">UMID</Label>
            <Input name={path} disabled={locked} placeholder="UMID" />
        </FormGroup>
    )
}

UMID.propTypes = {
    basePath: PropTypes.string.isRequired,
    locked: PropTypes.bool,
}