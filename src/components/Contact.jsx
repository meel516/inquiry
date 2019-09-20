import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types'

import {getPhoneTypes, checkForDuplicate} from '../services/SalesServices'

export default class Contact extends React.Component {
  state = {
    phoneTypes: [],
  }

  componentDidMount() {
    getPhoneTypes()
      .then((data) => this.setState({ phoneTypes: data }))
      .catch(error => console.log(error));
  }

  handleDupCheck = event => {
    const {contact} = this.props;
    if (this.canDuplicateCheck(contact)) {
      // console.log('run duplicate check!');
      // checkForDuplicate()
      //   .then((data) => this.setState({ duplicate: data }))
      //   .catch(error => console.log(error));
    } else {
      console.log('do not run duplicate check!');
    }
  }

  canDuplicateCheck = (contact) => {
    if (contact) {
      const {firstName, lastName, email, phoneNumber, phoneType} = contact;
      if (firstName === "" || lastName === "") {
        return false;
      }
      if ( (phoneNumber === "" && phoneType === "") || email === "") {
        return false;
      }
      return true;
    }
    return false;
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
          <Col><Label for="name" id="nameLabel" className="label-format">Name</Label></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Input type="text" name={`lead.${this.props.type}.firstName`} value={contact.firstName} onChange={onChange} onBlur={this.handleDupCheck} autoComplete="off" placeholder="First Name"/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input type="text" name={`lead.${this.props.type}.lastName`} value={contact.lastName} onChange={onChange} onBlur={this.handleDupCheck} placeholder="Last Name" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone" className="label-format">Phone</Label>
              <Input type="text" name={`lead.${this.props.type}.phone.number`} value={contact.phone.number||''} onBlur={this.handleDupCheck} onChange={onChange} placeholder="Phone" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phoneTypes" className="label-format">Phone Type</Label>
              <Input type="select" name={`lead.${this.props.type}.phone.type`} value={contact.phone.type||''} onChange={this.props.onChange} onBlur={this.handleDupCheck}>
                <option value="">Select One</option>
                {displayablePhoneTypes}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email" className="label-format">Email</Label>
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
