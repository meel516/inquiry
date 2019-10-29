import React from 'react';
import { Alert, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types'

import { getVeteranStatus } from '../services/dropdowns'

export default class VeteranStatus extends React.Component {
  state = {
    vetstatus: [],
  }

  componentDidMount() {
    getVeteranStatus()
      .then((data) => {
        this.setState({ vetstatus: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const { vetstatus } = this.state || [];
    const veteranStatusOptions = (vetstatus || []).map((status) => {
      return <option key={status.value} value={status.value}>{status.text}</option>
    })

    return (
      <FormGroup>
        <Label for="veteranstatus" className="label-format required-field">Veteran Status</Label>
        <Input 
          type="select" 
          id="veteranstatus" 
          name={"lead.prospect.veteranStatus"} 
          value={this.props.defaultValue} 
          onChange={this.props.handleChange} 
          onBlur={this.props.handleBlur}
          disabled={this.props.isReadOnly}
        >
          <option value="">Select One</option>
          {veteranStatusOptions}
        </Input>
        <ErrorMessage name="lead.prospect.veteranStatus" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>}
        />
      </FormGroup>
    )
  }
}

VeteranStatus.propTypes = {
  defaultValue: PropTypes.string,

  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

VeteranStatus.defaultProps = {
  defaultValue: '',
  isReadOnly: false,
}