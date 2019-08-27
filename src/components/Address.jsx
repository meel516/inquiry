import React from 'react'
import {Col, Input, FormGroup, Label, Row} from 'reactstrap'
import PropTypes from 'prop-types'
import Select from 'react-select'

import {getAddressStates} from '../services/SalesServices'

export default class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      type: this.props.type,
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    getAddressStates()
      .then((data) => {
        this.setState({ states: data })
      })
      .catch(error => console.log(error));
  }

  handleFieldChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    // this.setState({
    //   [name]: value
    // });
    this.props.onChange(this.state.type, name, value);
  }

  render() {
    const {states} = this.state || [];
    const options = (states || []).map((state) => {
       return <option key={state.value} value={state.value}>{state.text}</option>
     });
    const {address, type} = this.props||{};

    return (
      <section className="Address">
  			<Row>
  				<Col>
            <FormGroup>
    					<Label htmlFor="line1">Address</Label>
    					<Input type="text" name="addressLine1" value={address.addressLine1} onChange={this.handleFieldChange} placeholder="Address" />
            </FormGroup>
  				</Col>
  			</Row>
  			<Row>
  				<Col>
            <FormGroup>
    					<Label for="line2">Address 2</Label>
    					<Input type="text" name="addressLine2" value={address.addressLine2} onChange={this.handleFieldChange} placeholder="Apartment, studio, or floor" />
            </FormGroup>
  				</Col>
        </Row>
        <Row>
  				<Col>
            <FormGroup>
    					<Label for="city">City</Label>
              <Input type="text" name="city" bsSize="sm" value={address.city} onChange={this.handleFieldChange} />
            </FormGroup>
  				</Col>
  				<Col>
            <FormGroup>
    					<Label for="state">State</Label>
              <Input type="select" name="state" onChange={this.handleFieldChange}>
    						<option></option>
                {options}
  					</Input>
            </FormGroup>
  				</Col>
  				<Col>
  					<Label for="zip">Zip</Label>
  					<Input type="text" name="zip" value={address.zipcode} onChange={this.handleFieldChange} />
  				</Col>
  			</Row>
      </section>
    )
  }
}

Address.propTypes = {
  type: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
