import React from 'react';
import ReactDataGrid from 'react-data-grid';
import NumberFormat from 'react-number-format';
import { Alert, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik';

import { DropDownService, DuplicationService } from '../services/SalesServices'
import { ObjectMappingService } from "../services/Types";

const dupecolumns = [
  { key: 'name', name: 'Contact Name' },
  { key: 'phone', name: 'Phone' },
  { key: 'phonetype', name: 'Phone Type' },
  { key: 'email', name: 'Email' },
  { key: 'address1', name: 'Address 1' },  
  { key: 'address2', name: 'Address 2' },  
  { key: 'city', name: 'City' },  
  { key: 'state', name: 'State' },  
  { key: 'zip', name: 'Zip' }
];

const rows = [
  {id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}
];

export default class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phoneTypes: [],
    }
    this.dedup = new DuplicationService()
  }

  componentDidMount() {
    DropDownService.getPhoneTypes()
      .then((data) => this.setState({ phoneTypes: data }))
      .catch(error => console.log(error));
  }

  handleDupCheck = async event => {
    const { contact } = this.props;

    if (this.dedup.shouldRunDuplicateCheck(contact)) {
      debugger;
      console.log('run duplicate check!');
      console.log(JSON.stringify(contact));

      // DuplicationService.checkForDuplicate(contact)
      //   // .then((data) => this.setState({ duplicate: data }))
      //   .catch(error => console.log(error));
      const duplicatecontacts = await this.dedup.checkForDuplicate(contact);
      console.log("Dedupe response is: " + JSON.stringify(duplicatecontacts));

      const newrows = ObjectMappingService.createContactDuplicateGridContent(duplicatecontacts);
      console.log("newrows is: " + JSON.stringify(newrows));
    } else {
      console.log('do not run duplicate check!');
    }
    
    this.props.handleBlur(event);
  }

  render() {
    const { phoneTypes } = this.state || [];
    const { contact, errors, touched, onChange } = this.props;
    const displayablePhoneTypes = (phoneTypes || []).map(type => {
      return <option key={type.value} value={type.text}>{type.text}</option>
    });

    return (
      <>
        <Row>
          <Col><Label for="name" id="nameLabel" className="label-format required-field">Name</Label></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Input type="text" name={`lead.${this.props.type}.firstName`} value={contact.firstName} onChange={onChange} onBlur={this.handleDupCheck} autoComplete="off" placeholder="First Name"/>
              <ErrorMessage name={`lead.${this.props.type}.firstName`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input type="text" name={`lead.${this.props.type}.lastName`} value={contact.lastName} onChange={onChange} onBlur={this.handleDupCheck} placeholder="Last Name" />
              <ErrorMessage name={`lead.${this.props.type}.lastName`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone" className="label-format">Phone</Label>
              <NumberFormat className='form-control'  format="(###) ###-####" mask="_" name={`lead.${this.props.type}.phone.number`} value={contact.phone.number||''} onBlur={this.handleDupCheck} onChange={this.props.onChange} placeholder="Phone" />
              <ErrorMessage name={`lead.${this.props.type}.phone.number`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>}  />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phoneTypes" className="label-format">Phone Type</Label>
              <Input type="select" name={`lead.${this.props.type}.phone.type`} value={contact.phone.type || ''} onChange={this.props.onChange} onBlur={this.handleDupCheck}>
                <option value="">Select One</option>
                {displayablePhoneTypes}
              </Input>
              <ErrorMessage name={`lead.${this.props.type}.phone.type`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>}  />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email" className="label-format">Email</Label>
              <Input type="email" name={`lead.${this.props.type}.email`} value={contact.email} onChange={onChange} onBlur={this.handleDupCheck} placeholder="Email" />
              <ErrorMessage component="div" name={`lead.${this.props.type}.email`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg||'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <ReactDataGrid
          columns={dupecolumns}
          rowGetter={i => rows[i]}
          rowsCount={3}
          minHeight={150} />
        {this.props.children}
      </>
    )
  }
}

Contact.propTypes = {
  type: PropTypes.string.isRequired,
}
