import React from 'react';
import ReactDataGrid from 'react-data-grid';
import NumberFormat from 'react-number-format';
import Draggable from 'react-draggable';
import { Alert, Button, Col, FormGroup, Input, Modal, ModalBody, ModalHeader, ModalFooter, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik';
import Address from './Address';

import { SalesAPIService } from '../services/SalesServices'
import { getPhoneTypes } from '../services/dropdowns'
import { ObjectMappingService } from '../services/Types'
import findDuplicates from '../services/deduplication/find-duplicates'
import canHaveDuplicates from '../services/deduplication/can-have-duplicates'

const defaultColumnProperties = {
  resizable: true,
  width: 200
};

const EmptyRowsView = () => {
  const message = "No matches found";
  return (
    <div style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}>
      <h3>{message}</h3>
    </div>
  );
};

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.firstmodalcolumns = [
      { key: 'name', name: 'Contact Name' },
      { key: 'phone', name: 'Phone' },
      { key: 'email', name: 'Email' },
      { key: 'city', name: 'City' },
      { key: 'state', name: 'State' }
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    this.secondmodalcolumns = [
      { key: 'prospectid', name: 'Prospect ID', width: 100, resizable: true },
      { key: 'community', name: 'Community', width: 200, resizable: true },
      { key: 'iname', name: 'Influencer Name', width: 200, resizable: true },
      { key: 'iphone', name: 'Influencer Phone', width: 200, resizable: true },
      { key: 'iemail', name: 'Influencer Email', width: 200, resizable: true },
      { key: 'pname', name: 'Prospect Name', width: 200, resizable: true },
      { key: 'pphone', name: 'Prospect Phone', width: 200, resizable: true },
      { key: 'pemail', name: 'Prospect Email', width: 200, resizable: true },
      { key: 'spname', name: '2nd Person Name', width: 200, resizable: true },
      { key: 'spphone', name: '2nd Person Phone', width: 200, resizable: true },
      { key: 'spemail', name: '2nd Person Email', width: 200, resizable: true },
      { key: 'hasaddtl', name: 'Has Addtl Influencers', width: 200, resizable: true }
    ].map(c => ({ ...c }));

    this.state = {
      phoneTypes: [],
      rows: [],
      rows2: [],
      showModal: false,
      showSecondModal: false,
      dupeContactsFound: null,
      runDupeCheck: false,
      locked: false,
      savedPhone: null,
      savedEmail: null,
      activeDrags: 0,
    }
    this.sales = new SalesAPIService()
  }

  componentDidMount() {
    getPhoneTypes()
      .then((data) => this.setState({ phoneTypes: data }))
      .catch(error => console.log(error));
  }

  handleDupCheck = async event => {
    this.props.handleBlur(event);

    const { contact } = this.props

    // Save off Phone and Email.
    this.setState({ savedPhone: contact.phone.number, savedEmail: contact.email });

    if (this.props.duplicateCheck && this.state.runDupeCheck && canHaveDuplicates(contact)) {
      await findDuplicates(contact)
        .then((data) => {
          const mappedData = ObjectMappingService.createContactDuplicateGridContent(data);
          this.setState({ rows: mappedData, showModal: true, dupeContactsFound: data, runDupeCheck: false })
        })
        .catch(error => console.log(error));
    }
  }

  handleOnChange = (event) => {
    this.setState({ runDupeCheck: true })
    this.props.handleChange(event);
  }

  firstModalRowGetter = i => {
    return this.state.rows[i];
  };

  secondModalRowGetter = i => {
    return this.state.rows2[i];
  };

  onRowsSelected = async rows => {
    if (rows[0].row) {
      let contactid = rows[0].row.contactid;
      console.log("Selected ContactId is: " + contactid);
      await this.sales.retrieveLeadDataForContactId(contactid)
        .then((data) => this.setState({ rows2: data, showSecondModal: true }))
        .catch(error => console.log(error));

      // Following logic loads Contact data to form.
      if (this.state.dupeContactsFound) {
        // Find the Contact selected from the searched list.
        for (let i = 0; i < this.state.dupeContactsFound.length; i++) {
          let dupeContact = this.state.dupeContactsFound[i];
          if (dupeContact) {
            if (dupeContact.contactId === contactid) {
              const { setFieldValue } = this.props;
              const formContact = ObjectMappingService.createContact(dupeContact);
              setFieldValue(`lead.${this.props.type}`, formContact);
              this.setState({ locked: true });
              break;
            }
          }
        }
      }
    }

    this.setState({
      selectedIndexes: rows.map(r => r.rowIdx)
    });
  };

  handleFirstToggle = (e) => {
    const { setFieldValue } = this.props;
    const formContact = ObjectMappingService.createEmptyContact();
    setFieldValue(`lead.${this.props.type}`, formContact);

    // Now reset phone and email if they were saved in state.
    if (this.state.savedPhone) {
      setFieldValue(`lead.influencer.phone.number`, this.state.savedPhone);
    }
    if (this.state.savedEmail) {
      setFieldValue(`lead.influencer.email`, this.state.savedEmail);
    }

    this.setState(prevState => ({
      showModal: !prevState.showModal,
      locked: false,
    }));
  }

  handleSecondToggle = (e) => {
    this.setState(prevState => ({
      showSecondModal: !prevState.showSecondModal,
    }));
  }

  handleToggleAll = (e) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      showSecondModal: !prevState.showSecondModal,
    }));
  }

  onStart = () => {
    this.setState({activeDrags: this.state.activeDrags + 1});
  };

  onStop = () => {
    this.setState({activeDrags: this.state.activeDrags - 1});
  };

  render() {
    const { locked, phoneTypes } = this.state || [];
    const makeFieldsLocked = this.props.isReadOnly || locked || (this.props.contact.contactId != null);
    const displayablePhoneTypes = (phoneTypes || []).map(type => {
      return <option key={type.value} value={type.text}>{type.text}</option>
    });

    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

    return (
      <>
        <Row>
          <Col><Label for="name" id="nameLabel" className="label-format required-field">Name</Label></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Input type="text"
                name={`lead.${this.props.type}.firstName`}
                value={this.props.contact.firstName}
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                autoComplete="off"
                readOnly={makeFieldsLocked}
                placeholder="First Name" />
              <ErrorMessage name={`lead.${this.props.type}.firstName`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input
                type="text"
                name={`lead.${this.props.type}.lastName`}
                value={this.props.contact.lastName}
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                readOnly={makeFieldsLocked}
                placeholder="Last Name"
              />
              <ErrorMessage name={`lead.${this.props.type}.lastName`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phone" className="label-format">Phone</Label>
              <NumberFormat
                className='form-control'
                format="(###) ###-####"
                mask="_"
                name={`lead.${this.props.type}.phone.number`}
                value={(this.props.contact.phone ? (this.props.contact.phone.number || '') : '')}
                onBlur={(e) => this.handleDupCheck(e)}
                onChange={this.handleOnChange}
                placeholder="Phone"
                readOnly={makeFieldsLocked}
              />
              <ErrorMessage name={`lead.${this.props.type}.phone.number`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="phoneTypes" className="label-format">Phone Type</Label>
              <Input
                type="select"
                name={`lead.${this.props.type}.phone.type`}
                value={(this.props.contact.phone ? (this.props.contact.phone.type || '') : '')}
                onChange={this.props.handleChange}
                onBlur={this.props.handleBlur}
                disabled={makeFieldsLocked}
              >
                <option value="">Select One</option>
                {displayablePhoneTypes}
              </Input>
              <ErrorMessage name={`lead.${this.props.type}.phone.type`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email" className="label-format">Email</Label>
              <Input
                type="email"
                name={`lead.${this.props.type}.email`}
                value={this.props.contact.email || ''}
                onBlur={(e) => this.handleDupCheck(e)}
                onChange={this.handleOnChange}
                placeholder="Email"
                readOnly={makeFieldsLocked}
              />
              <ErrorMessage name={`lead.${this.props.type}.email`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>

        {this.props.hasAddress &&
          <Address
            type="influencer"
            address={this.props.contact.address}
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={makeFieldsLocked}
          />
        }

        {this.props.duplicateCheck &&
          <Draggable handle=".modalone" {...dragHandlers}>
            <Modal className="modalone" isOpen={this.state.showModal} size="xl">
              <ModalHeader>
                {"Potential Contact Matches"}
              </ModalHeader>
              <ModalBody>
                <p>Is this who you are talking to? If so, click the name below, otherwise click "None of These".</p>
                <ReactDataGrid
                  columns={this.firstmodalcolumns}
                  rowGetter={this.firstModalRowGetter}
                  rowsCount={this.state.rows.length}
                  minHeight={250}
                  minWidth={1100}
                  emptyRowsView={EmptyRowsView}
                  onRowClick={(rowId, row) => this.onRowsSelected([{ row: row, rowIdx: rowId }])}
                />
                <Draggable handle=".modaltwo" {...dragHandlers}>
                  <Modal className="modaltwo" isOpen={this.state.showSecondModal} size="xl">
                    <ModalHeader>
                      {"Potential Lead Matches"}
                    </ModalHeader>
                    <ModalBody>
                      <p>Below are leads that this person is associated with. Click the one you want to update, otherwise click "None of These". If you clicked the wrong person, click "Go Back" to change.</p>
                      <ReactDataGrid
                        columns={this.secondmodalcolumns}
                        rowGetter={this.secondModalRowGetter}
                        rowsCount={this.state.rows2.length}
                        minHeight={250}
                        minWidth={1100}
                        emptyRowsView={EmptyRowsView}
                      //onRowClick={( rowId, row )=>this.onRows2Selected([{ row:row, rowIdx:rowId }])}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button type="button" color="info" size="sm" onClick={this.handleSecondToggle}>Go Back</Button>
                      <Button type="button" color="info" size="sm" onClick={this.handleToggleAll}>None of These</Button>
                    </ModalFooter>
                  </Modal>
                </Draggable>
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="info" size="sm" onClick={this.handleFirstToggle}>None of These</Button>
              </ModalFooter>
            </Modal>
          </Draggable>
        }
      </>
    )
  }
}

Contact.propTypes = {
  type: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  hasAddress: PropTypes.bool,

  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
  duplicateCheck: PropTypes.bool,
}

Contact.defaultProps = {
  isReadOnly: false,
  duplicateCheck: false,
  hasAddress: false,
}
