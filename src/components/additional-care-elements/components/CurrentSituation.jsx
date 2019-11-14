import React, { useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'
import { getCurrentSituation } from '../../../services/dropdowns'
import { Select } from '../../formik-inputs';

export const CurrentSituation = ({ basePath }) => {
  const [ situations, setSituations ] = useState([]);
  const name = `${basePath}.currentSituation`;

  useEffect(() => {
    getCurrentSituation()
      .then((data) => setSituations(data));
  }, [setSituations]);

  const situationOptions = useMemo(() => {
    return situations.map(situation => {
      return <option key={situation.value} value={situation.value}>{situation.text}</option>;
    })
  }, [situations]);

  return (
    <FormGroup md="9">
        <Label for={name} className="label-format">Current Living Situation</Label>
        <Select name={name} placeholder='Select One'>
          {situationOptions}
        </Select>
    </FormGroup>
  )
}

CurrentSituation.propTypes = {
  basePath: PropTypes.string.isRequired,
}