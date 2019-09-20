import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

// <VeteranStatus status={this.state.veteranStatus} onChange={this.handleVeteranStatusChange}/>
import {getVeteranStatus} from '../services/SalesServices'

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
    const {vetstatus} = this.state || [];
    const veteranStatusOptions = (vetstatus || []).map((status) => {
      return <option key={status.value} value={status.value}>{status.text}</option>
    })

    return (
      <FormGroup>
        <Label for="veteranstatus" className="label-format">Veteran Status</Label>
        <Input type="select" id="veteranstatus" name={"lead.prospect.veteranStatus"} onChange={this.props.onChange}>
          <option value="">Select One</option>
          {veteranStatusOptions}
        </Input>
      </FormGroup>
      )
  }
}
