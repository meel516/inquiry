import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';

const URL_PHONE_TYPES = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/phoneTypes`;

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneTypes: [],
    }
    this.handleDupCheck = this.handleDupCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyChangesToContact = this.applyChangesToContact.bind(this);
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
    // this.setState({
    //   [name]: value
    // });
    this.applyChangesToContact(name, value);
  }

  applyChangesToContact(name, value) {
    var type = this.props.type;
    this.props.onChange(type, name, value);
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
    console.log(`Contact: ${JSON.stringify(this.props.contact)}`)
    console.log(`Contact Type: ${this.props.contact}`)

    return (
      <>
        <Row>
          <Col><Label for="phone">Name</Label></Col>
        </Row>
        <Row>
          <Col><Input type="text" name="firstName" value={this.props.contact.firstName} onChange={this.handleChange} placeholder="First name" /></Col>
          <Col><Input type="text" name="lastName" value={this.props.contact.lastName} onChange={this.handleChange} placeholder="Last name" /></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input type="text" name="phone" onBlur={this.handleDupCheck} onChange={this.handleChange} placeholder="Phone" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phoneTypes">Phone Types</Label>
              <PhoneTypes types={phoneTypes} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
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
