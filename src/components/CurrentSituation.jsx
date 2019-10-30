import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types'

import { getCurrentSituation } from '../services/dropdowns'

export default class CurrentSituation extends React.Component {
  state = {
    currentSituation: [],
  }

  componentDidMount() {
    getCurrentSituation()
      .then((data) => this.setState({ currentSituation: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { currentSituation } = this.state || [];
    const currentSituationOptions = currentSituation.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    let defaultCurrentSituation = this.props.defaultValue
    if (this.props.defaultValue == null) {
      defaultCurrentSituation = '';
    }
    console.log(`Current Situation: ${defaultCurrentSituation}`)

    return (
      <FormGroup md="9">
        <Label for="currentSituation" className="label-format">Current Living Situation</Label>
        <Input 
          type="select" 
          id="currentSituation" 
          name="currentSituation" 
          value={defaultCurrentSituation} 
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
  defaultValue: PropTypes.number,

  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

CurrentSituation.defaultProps = {
  isReadOnly: false,
  defaultValue: -1,
}