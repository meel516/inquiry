import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'

import { getReasonForInterest } from '../services/dropdowns'

export default class ReasonForCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonForCall: [],
    }
  }

  componentDidMount() {
    getReasonForInterest()
      .then((data) => this.setState({ reasonForCall: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { reasonForCall } = this.state || [];
    const reasonForCallOptions = reasonForCall.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup>
        <Label for="reasonForCall" className="label-format">Reason for Call</Label>
        <Input 
          type="select" 
          id="reasonForCall" 
          name="lead.reasonForCall" 
          value={this.props.defaultValue} 
          onChange={this.props.handleChange} 
          onBlur={this.props.handleBlur} 
          disabled={this.props.isReadOnly}
        >
          <option value="">Select One</option>
          {reasonForCallOptions}
        </Input>
      </FormGroup>
    )
  }
}

ReasonForCall.propTypes = {
  defaultValue: PropTypes.number,

  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

ReasonForCall.defaultProps = {
  isReadOnly: false,
  defaultValue: -1,
}