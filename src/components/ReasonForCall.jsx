import React from 'react';
import PropTypes from 'prop-types';
import {Input, FormGroup, Label} from 'reactstrap';

const URL_INTEREST_REASON = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/interestReason`;

const reasonForCallList = [
 { value: 1, text: 'This is a test...'}
];

export default class ReasonForCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonForCall: [],
    }
  }

  componentDidMount() {
    fetch(URL_INTEREST_REASON, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => this.setState({ reasonForCall: data }))
      .catch(error => console.log(error));
  }


  render() {
    const {reasonForCall} = this.state;
    const reasonForCallOptions = reasonForCall.map((type) => {
      return  <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup>
        <Label for="reasonForCall" className="label-format">Reason for Call</Label>
        <Input type="select" id="reasonForCall" name="reasonForCall">
          <option value="">Select One</option>
          {reasonForCallOptions}
        </Input>
      </FormGroup>
    )
  }
}
