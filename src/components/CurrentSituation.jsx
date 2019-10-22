import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types'

import { DropDownService } from '../services/SalesServices'

export default class CurrentSituation extends React.Component {
  state = {
    currentSituation: [],
  }

  componentDidMount() {
    DropDownService.getCurrentSituation()
      .then((data) => this.setState({ currentSituation: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { currentSituation } = this.state || [];
    const { defaultValue } = this.props || '';
    const currentSituationOptions = currentSituation.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup md="9">
        <Label for="currentSituation" className="label-format">Current Living Situation</Label>
        <Input 
          type="select" 
          id="currentSituation" 
          name="currentSituation" 
          value={defaultValue} 
          onChange={this.props.handleChange}
          disabled={this.props.isReadOnly}
        >
          <option value="">Select One</option>
          {currentSituationOptions}
        </Input>
      </FormGroup>
    )
  }
}

CurrentSituation.propTypes = {
  defaultValue: PropTypes.string,

  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

CurrentSituation.defaultProps = {
  isReadOnly: false
}