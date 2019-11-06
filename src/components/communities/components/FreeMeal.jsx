import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import freeMealListings from '../../../constants/free-meal-listings';

const freeMealOptions = freeMealListings.map((optn) => {
  return <option key={optn.value} value={optn.label}>{optn.label}</option>
});

const FreeMeal = ({ isReadOnly, handleChange}) => (
  <React.Fragment>
    <Label for="freeMeal" className="label-format">Does this Visit include a Free Meal?</Label>
    <Input type="select" id="freeMeal" name="freeMeal" onChange={handleChange} disabled={isReadOnly}>
      {freeMealOptions}
    </Input>
  </React.Fragment>
);
  
FreeMeal.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
}

FreeMeal.defaultProps = {
  isReadOnly: false
}

export default FreeMeal;