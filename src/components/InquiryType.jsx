import React from 'react';
import PropTypes from 'prop-types';
import {Input, FormGroup, Label} from 'reactstrap';

const URL_INQUIRY_TYPES = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/inquiryTypes`;

const inquiryTypeList = [
 { value: 1, text: 'Call In'}
];

export default class InquiryType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inquiryTypes: [],
    }
  }

  componentDidMount() {
    fetch(URL_INQUIRY_TYPES, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => this.setState({ inquiryTypes: data }))
      .catch(error => console.log(error));
  }


  render() {
    const {inquiryTypes} = this.state;
    const inquiryTypeOptions = inquiryTypes.map((type) => {
      return  <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup>
        <Label for="inquiryType" className="label-format">Inquiry Method</Label>
        <Input type="select" id="inquiryType" name="inquiryType">
          <option value="">Select One</option>
          {inquiryTypeOptions}
        </Input>
      </FormGroup>
    )
  }
}
