import React from 'react';
import {Col, Input, FormGroup, Label, Row} from 'reactstrap';
import Select from 'react-select';

const URL_STATELIST = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/stateProv`;

export default class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
    }
  }

  componentDidMount() {
    console.log(`uri: ${URL_STATELIST}`);
    fetch(URL_STATELIST, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => {
        this.setState({ states: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const {states} = this.state || [];
    // const options = (states || []).map((state) => {
    //   return <option key={state.value} value={state.value}>{state.text}</option>
    // })

    return (
      <>
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
    					</Input>
            </FormGroup>
  				</Col>
  				<Col>
  					<Label for="zip">Zip</Label>
  					<Input type="text" name="zip" />
  				</Col>
  			</Row>
      </>
    )
  }
}
