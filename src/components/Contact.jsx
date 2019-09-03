import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types'

const URL_PHONE_TYPES = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/phoneTypes`;

export default class Contact extends React.Component {
  state = {
    phoneTypes: [],
  }

  componentDidMount() {
    fetch(URL_PHONE_TYPES, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => this.setState({ phoneTypes: data }))
      .catch(error => console.log(error));
  }

  handleDupCheck = event => {
    console.log('We made it');
    const {contact} = this.props;
    console.log(`firstname: ${contact.firstName}`);
  }

  render() {
    const {phoneTypes} = this.state||[];
    const {contact, errors, touched, onChange} = this.props;
    const displayablePhoneTypes = (phoneTypes||[]).map(type => {
      return <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <>
        <Row>
          <Col><Label for="phone">Name</Label></Col>
        </Row>
        <Row>
          <Col>
            <Input type="text" name={`lead.${this.props.type}.firstName`} value={contact.firstName} onChange={onChange} onBlur={this.handleDupCheck} autoComplete="off" placeholder="First name"/>
          </Col>
          <Col>
            <Input type="text" name={`lead.${this.props.type}.lastName`} value={contact.lastName} onChange={onChange} onBlur={this.handleDupCheck} placeholder="Last name" />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input type="text" name={`lead.${this.props.type}.phone.number`} value={contact.phone.number} onBlur={this.handleDupCheck} onChange={onChange} onBlur={this.handleDupCheck} placeholder="Phone" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phoneTypes">Phone Types</Label>
              <Input type="select" name={`lead.${this.props.type}.phone.type`} value={contact.phone.type} onChange={this.props.onChange} onBlur={this.handleDupCheck}>
                <option value=""></option>
                {displayablePhoneTypes}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name={`lead.${this.props.type}.email`} value={contact.email} onChange={onChange} onBlur={this.handleDupCheck} placeholder="Email" />
            </FormGroup>
          </Col>
        </Row>
        {this.props.children}
      </>
    )
  }
}

Contact.propTypes = {
  type: PropTypes.string.isRequired,
}
