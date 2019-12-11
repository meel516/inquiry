import React, { useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getVeteranStatus } from '../../../services/dropdowns';
import { Select } from '../../formik-inputs';

export const VeteranStatus = ({ basePath, locked = false }) => {
  const [ statuses, setStatuses ] = useState([]);
  const name = `${basePath}.veteranStatus`;

  useEffect(() => {
    getVeteranStatus()
      .then((data) => setStatuses(data));
  }, [setStatuses]);

  const veteranStatusOptions = useMemo(() => {
    return statuses.map(status => {
      return <option key={status.value} value={status.value}>{status.text}</option>
    })
  }, [statuses]);

  return (
    <FormGroup>
      <Label for={name} className="label-format required-field">Veteran Status</Label>
      <Select name={name} disabled={locked}>
        {veteranStatusOptions}
      </Select>
    </FormGroup>
  )
}

VeteranStatus.propTypes = {
  basePath: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}