import React from 'react';
import { Alert, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage, Field } from 'formik';

import { DropDownService } from '../services/SalesServices'

export default class CareType extends React.Component {
  state = {
    careTypes: [],
  }

  componentDidMount() {
    DropDownService.getCareTypes()
      .then((data) => this.setState({ careTypes: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { careTypes } = this.state || [];
    const { handleChange } = this.props;
    const careTypeOptions = careTypes.map((type) => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup>
        <Label for="careType" className="label-format required-field">Care Level Recommended</Label>
        <Input type="select" id="careType" name="lead.careType" onChange={this.props.handleChange} onBlur={this.props.onBlur}>
          <option value="">Select One</option>
          {careTypeOptions}
        </Input>
        <ErrorMessage name="lead.careType" render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>}/>
      </FormGroup>
    )
  }
}
