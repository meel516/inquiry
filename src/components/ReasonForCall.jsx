import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';

import { DropDownService } from '../services/SalesServices'

export default class ReasonForCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonForCall: [],
    }
  }

  componentDidMount() {
    DropDownService.getReasonForInterest()
      .then((data) => this.setState({ reasonForCall: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { reasonForCall } = this.state || [];
    const { handleChange, handleBlur } = this.props;
    const reasonForCallOptions = reasonForCall.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup>
        <Label for="reasonForCall" className="label-format">Reason for Call</Label>
        <Input type="select" id="reasonForCall" name="lead.prospect.reasonForCall" onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select One</option>
          {reasonForCallOptions}
        </Input>
      </FormGroup>
    )
  }
}
