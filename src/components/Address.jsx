import React from 'react'
import {Col, Input, FormGroup, Label, Row} from 'reactstrap'
import PropTypes from 'prop-types'

import {getAddressStates} from '../services/SalesServices'

export default class Address extends React.Component {
  state = {
    states: [],
    type: this.props.type,
  }

  componentDidMount() {
    getAddressStates()
      .then((data) => {
        this.setState({ states: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const {states} = this.state || [];
    const {address, type, onChange} = this.props;
    const options = (states || []).map((state) => {
       return <option key={state.value} value={state.value}>{state.text}</option>
     })

    return (
      <section className={`address-${type}`}>
  			<Row>
  				<Col>
            <FormGroup>
    					<Label htmlFor="line1" className="label-format">Address</Label>
    					<Input type="text" name={`lead.${this.props.type}.address.addressLine1`} value={address.addressLine1||''} onChange={onChange} placeholder="Address" />
            </FormGroup>
  				</Col>
  				<Col>
            <FormGroup>
    					<Label for="line2" className="label-format">Address 2</Label>
    					<Input type="text" name={`lead.${this.props.type}.address.addressLine2`} value={address.addressLine2||''} onChange={onChange} placeholder="Apartment, studio, or floor" />
            </FormGroup>
  				</Col>
        </Row>
        <Row>
  				<Col>
            <FormGroup>
    					<Label for="city" className="label-format">City</Label>
    					<Input type="text" name={`lead.${this.props.type}.address.city`} value={address.city} onChange={onChange} placeholder="City"/>
            </FormGroup>
  				</Col>
  				<Col>
            <FormGroup>
    					<Label for="state" className="label-format">State</Label>
              <Input type="select" name={`lead.${this.props.type}.address.state`} onChange={onChange}>
    						<option></option>
                {options}
  					</Input>
            </FormGroup>
  				</Col>
  				<Col>
  					<Label for="zip" className="label-format">Zip</Label>
  					<Input type="number" name={`lead.${this.props.type}.address.zip`} value={address.zipcode} onChange={onChange} />
  				</Col>
  			</Row>
      </section>
    )
  }
}

Address.propTypes = {
  type: PropTypes.string.isRequired,
}
