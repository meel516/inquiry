import React from 'react';
import { Alert, Input, FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types'

import { getInquiryTypes } from '../services/dropdowns'

export default class InquiryType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inquiryTypes: [],
    }
  }

  componentDidMount() {
    getInquiryTypes()
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
        <Label for="inquiryType" className="label-format required-field">Inquiry Method</Label>
        <Input 
          type="select" 
          id="inquiryType" 
          name="lead.inquiryType" 
          value={this.props.defaultValue} 
          onChange={this.props.handleChange} 
          onBlur={this.props.handleBlur} 
          disabled={this.props.isReadOnly}
        >
          <option value="">Select One</option>
          {inquiryTypeOptions}
        </Input>
        <ErrorMessage name="lead.inquiryType" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
      </FormGroup>
    )
  }
}

InquiryType.propTypes = {
  defaultValue: PropTypes.number,

  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

InquiryType.defaultProps = {
  defaultValue: -1,
  isReadOnly: false,
}