import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import freeMealListings from '../../../constants/free-meal-listings';

function FreeMeal(props) {
    return (
      <React.Fragment>
        <Label for="freeMeal" className="label-format">Does this Visit include a Free Meal?</Label>
        <Input type="select" id="freeMeal" name="freeMeal" onChange={props.handleChange} disabled={props.isReadOnly}>
          {freeMealListings.map((optn) => {
            return <option key={optn.value} value={optn.label}>{optn.label}</option>
          })}
        </Input>
      </React.Fragment>
    )
  }
  
  FreeMeal.propTypes = {
    handleChange: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool,
  }
  
  FreeMeal.defaultProps = {
    isReadOnly: false
  }

  export default FreeMeal;