import React from 'react'
import {Col, Input, FormGroup, Label, Row} from 'reactstrap'
import PropTypes from 'prop-types'

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
    const {address} = this.props||{};

    return (
      <section className="Address">
        <Row>
  				<Col>
            <FormGroup>
    					<Label htmlFor="line1" className="label-format">Address 1</Label>
    					<Input type="text" name={`lead.${this.props.type}.address.line1`} value={address.line1||''} onChange={this.props.onChange} onBlur={this.props.onBlur} placeholder="Street Address" />
            </FormGroup>
  				</Col>
          <Col>
            <FormGroup>
    					<Label for="line2" className="label-format">Address 2</Label>
    					<Input type="text" name={`lead.${this.props.type}.address.line2`} value={address.line2||''} onChange={this.props.onChange} onBlur={this.props.onBlur} placeholder="Apartment, Studio, or Floor" />
            </FormGroup>
  				</Col>
  			</Row>
        <Row>
  				<Col>
            <FormGroup>
    					<Label for="city" className="label-format">City</Label>
              <Input type="text" name={`lead.${this.props.type}.address.city`} value={address.city||''} onChange={this.props.onChange} onBlur={this.props.onBlur} placeholder="City" />
            </FormGroup>
  				</Col>
  				<Col>
            <FormGroup>
    					<Label for="state" className="label-format">State</Label>
              <Input type="select" name={`lead.${this.props.type}.address.state`} onChange={this.props.onChange}>
                <option value="">Select One</option>
                {options}
  					</Input>
            </FormGroup>
  				</Col>
  				<Col>
  					<Label for="zip" className="label-format">Zip</Label>
  					<Input type="number" name={`lead.${this.props.type}.address.zip`} value={address.zipcode} onChange={this.props.onChange} onBlur={this.props.onBlur} placeholder="Zip" />
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
