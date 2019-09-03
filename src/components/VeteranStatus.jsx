import React from 'react';
import {FormGroup, Label} from 'reactstrap';
import Select from 'react-select';

// <VeteranStatus status={this.state.veteranStatus} onChange={this.handleVeteranStatusChange}/>
const URL_VET_STATUS = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/veteranStatus`;

export default class VeteranStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('VeteranStatus.componentDidMount()')
    fetch(URL_VET_STATUS, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => {
        data.map(function(vs) {
          vs.label = vs.text;
        })
        this.setState({ vetstatus: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const {vetstatus} = this.state || [];

    return (
      <FormGroup>
        <Label for="veteranstatus" className="label-format">Veteran Status</Label>
        <Select
          onChange={this.props.onChange}
          options={vetstatus}
          />
      </FormGroup>
      )
  }
}
