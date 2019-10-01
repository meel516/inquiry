import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

import { DropDownService } from '../services/SalesServices'

export default class InquiryType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inquiryTypes: [],
    }
  }

  componentDidMount() {
    DropDownService.getInquiryTypes()
      .then((data) => this.setState({ inquiryTypes: data }))
      .catch(error => console.log(error));
  }


  render() {
    const { inquiryTypes } = this.state || [];
    const inquiryTypeOptions = inquiryTypes.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup>
        <Label for="inquiryType" className="label-format">Inquiry Method</Label>
        <Input type="select" id="inquiryType" name="lead.inquiryType" onChange={this.props.handleChange} onBlur={this.props.handleBlur}>
          <option value="">Select One</option>
          {inquiryTypeOptions}
        </Input>
        <ErrorMessage name="lead.inquiryType" component="div" />
      </FormGroup>
    )
  }
}
