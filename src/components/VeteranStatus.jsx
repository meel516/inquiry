import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

// <VeteranStatus status={this.state.veteranStatus} onChange={this.handleVeteranStatusChange}/>
import { DropDownService } from '../services/SalesServices'

export default class VeteranStatus extends React.Component {
  state = {
    vetstatus: [],
  }

  componentDidMount() {
    DropDownService.getVeteranStatus()
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
        <Label for="veteranstatus" className="label-format">Veteran Status</Label>
        <Input type="select" id="veteranstatus" name={"lead.prospect.veteranStatus"} onChange={this.props.onChange} onBlur={this.props.onBlur}>
          <option value="">Select One</option>
          {veteranStatusOptions}
        </Input>
        <ErrorMessage name="lead.prospect.veteranStatus" component="div" />
      </FormGroup>
    )
  }
}
