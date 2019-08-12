import React from 'react';
import {Col, Form, Input, Label, Row} from 'reactstrap';
import axios from 'axios';

const URL_PHONE_TYPES = "http://localhost/Sims/api/dropdowns/phoneTypes";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneTypes: [],
    }
    this.handleDupCheck = this.handleDupCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(URL_PHONE_TYPES, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => this.setState({ phoneTypes: data }))
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Contact componentDidUpdate()')
  }

  handleDupCheck() {
    console.log('We made it');
    console.log(`firstname: ${this.props.firstName}`);
  }

  render() {
    const {phoneTypes} = this.state;

    return (
      <div>
        <Row>
          <Col><Label for="phone">Name</Label></Col>
        </Row>
        <Row>
          <Col><Input type="text" name="firstName" onChange={this.handleChange} placeholder="First name" /></Col>
          <Col><Input type="text" name="lastName" onChange={this.handleChange} placeholder="Last name" /></Col>
        </Row>
        <Row>
          <Col>
            <Label for="phone">Phone</Label>
            <Input type="text" name="phone" onBlur={this.handleDupCheck} onChange={this.handleChange} placeholder="Phone" />
          </Col>
          <Col>
            <Label for="phoneTypes">Phone Types</Label>
            <PhoneTypes types={phoneTypes} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="email">Email</Label>
            <Input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
          </Col>
        </Row>
      </div>
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
    <Input type="select" name="phoneType" onChange={props.handleChanges}>
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
