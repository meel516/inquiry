import React from 'react';
import {Col, Input, FormGroup, Label, Row} from 'reactstrap';
import Select from 'react-select';

import {getAddressStates} from '../services/SalesServices'

export default class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
    }
  }

  componentDidMount() {
    getAddressStates()
      .then((data) => {
        console.log(data)
        this.setState({ states: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const {states} = this.state || [];
    const options = (states || []).map((state) => {
       return <option key={state.value} value={state.value}>{state.text}</option>
     })

    return (
      <div className="Address">
  			<Row>
  				<Col>
            <FormGroup>
    					<Label htmlFor="line1">Address</Label>
    					<Input type="text" name="addressLine1" placeholder="Address" />
            </FormGroup>
  				</Col>
  			</Row>
  			<Row>
  				<Col>
            <FormGroup>
    					<Label for="line2">Address 2</Label>
    					<Input type="text" name="addressLine2" placeholder="Apartment, studio, or floor" />
            </FormGroup>
  				</Col>
        </Row>
        <Row>
  				<Col>
            <FormGroup>
    					<Label for="city">City</Label>
    					<Input type="text" name="city" />
            </FormGroup>
  				</Col>
  				<Col>
            <FormGroup>
    					<Label for="state">State</Label>
              <Input type="select" name="state">
    						<option></option>
                {options}
  					</Input>
            </FormGroup>
  				</Col>
  				<Col>
  					<Label for="zip">Zip</Label>
  					<Input type="text" name="zip" />
  				</Col>
  			</Row>
      </div>
    )
  }
}
