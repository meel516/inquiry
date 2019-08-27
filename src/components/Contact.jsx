import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

import {getPhoneTypes, checkForDuplicate} from '../services/SalesServices'

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneTypes: [],
      duplicate: null,
    }

    this.handleRunDupCheck = this.handleRunDupCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyChangesToContact = this.applyChangesToContact.bind(this);
  }

  componentDidMount() {
    const {phoneTypes} = this.state;

    if (phoneTypes) {
      getPhoneTypes()
        .then((data) => this.setState({ phoneTypes: data }))
        .catch(error => console.log(error));
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    // this.setState({
    //   [name]: value
    // });
    this.applyChangesToContact(name, value);
  }

  applyChangesToContact(name, value) {
    var type = this.props.type;
    this.props.onChange(type, name, value);
    this.handleRunDupCheck();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log('Contact componentDidUpdate()')
  }

  handleRunDupCheck() {
    const {contact} = this.props;
    if (this.canDuplicateCheck(contact)) {
      console.log('run duplicate check!');
      checkForDuplicate()
        .then((data) => this.setState({ duplicate: data }))
        .catch(error => console.log(error));
    }
    else {
      console.log('do not run duplicate check!');
    }
  }

  canDuplicateCheck(contact) {
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
    const {phoneTypes} = this.state;

    return (
      <>
        <Row>
          <Col><Label for="phone">Name</Label></Col>
        </Row>
        <Row>
          <Col>
            {false && <input type="text" className="form-control-sm form-control" name="firstName" defaultValue={this.props.contact.firstName} onBlur={this.handleChange} placeholder="First name" />}
            <Input type="text" name="firstName" bsSize="sm" defaultValue={this.props.contact.firstName} onBlur={this.handleChange} placeholder="First name" />
          </Col>
          <Col>
            <Input type="text" name="lastName" bsSize="sm" defaultValue={this.props.contact.lastName} onBlur={this.handleChange} placeholder="Last name" />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input type="text" name="phoneNumber" bsSize="sm" onBlur={this.handleChange} placeholder="Phone" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phoneTypes">Phone Types</Label>
              <PhoneTypes types={phoneTypes} onChange={this.handleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" bsSize="sm" onChange={this.handleChange} placeholder="Email" />
            </FormGroup>
          </Col>
        </Row>
        {this.props.children}
      </>
    )
  }
}

function PhoneTypes(props) {
  const types = props.types;
  const phoneTypeItems = types.map((type) =>
    <PhoneTypeItem key={type.value}
                   item={type} />
  );
  return (
    <Input type="select" name="phoneType" bsSize="sm" onChange={props.handleChanges}>
      <option value=""></option>
      {phoneTypeItems}
    </Input>
  )
}

function PhoneTypeItem(props) {
  return (
    <option value={props.item.value}>{props.item.text}</option>
  );
}
