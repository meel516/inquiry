import React from 'react';
import ReactDataGrid from 'react-data-grid';
import NumberFormat from 'react-number-format';
import { Alert, Button, Col, FormGroup, Input, Modal, ModalBody, ModalHeader, ModalFooter, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik';

import { DropDownService, DuplicationService, SalesAPIService } from '../services/SalesServices'

const defaultColumnProperties = {
  resizable: true,
  width: 120
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
      { key: 'contactid', name: 'ContactId' }, // NOTE: This will be hidden but used for further API lookup!
      { key: 'name', name: 'Contact Name' },
      { key: 'phone', name: 'Phone' },
      { key: 'phonetype', name: 'Phone Type' },
      { key: 'email', name: 'Email' },
      { key: 'address1', name: 'Address 1' },  
      { key: 'address2', name: 'Address 2' },  
      { key: 'city', name: 'City' },  
      { key: 'state', name: 'State' },  
      { key: 'zip', name: 'Zip' }
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    this.secondmodalcolumns = [
      { key: 'leadid', name: 'Lead Id' },
      { key: 'community', name: 'Community' },  
      { key: 'pname', name: 'Prospect Name' },
      { key: 'pphone', name: 'Prospect Phone' },
      { key: 'pemail', name: 'Prospect Email' },
      { key: 'iname', name: 'Influencer Name' },
      { key: 'iphone', name: 'Influencer Phone' },
      { key: 'iemail', name: 'Influencer Email' },
      { key: 'spname', name: '2nd Person Name' },
      { key: 'spphone', name: '2nd Person Phone' },
      { key: 'spemail', name: '2nd Person Email' },
      { key: 'hasaddtl', name: 'Has Addtl Influencers' }
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    this.state = {
      phoneTypes: [],
      rows: [],
      rows2: [],
      showModal: false,
      showSecondModal: false,
    }
    this.dedup = new DuplicationService()
    this.sales = new SalesAPIService()
  }

  componentDidMount() {
    DropDownService.getPhoneTypes()
      .then((data) => this.setState({ phoneTypes: data }))
      .catch(error => console.log(error));
  }

  handleDupCheck = async event => {
    const { contact } = this.props;

    if (this.dedup.shouldRunDuplicateCheck(contact)) {
      console.log('run duplicate check!');
      console.log(JSON.stringify(contact));

      // DuplicationService.checkForDuplicate(contact)
      //   // .then((data) => this.setState({ duplicate: data }))
      //   .catch(error => console.log(error));
      //const duplicatecontacts = await this.dedup.checkForDuplicate(contact);
      //console.log("Dedupe response is: " + JSON.stringify(duplicatecontacts));

      // const newrows = ObjectMappingService.createContactDuplicateGridContent(duplicatecontacts);
      // console.log("newrows is: " + JSON.stringify(newrows));
      //this.setState({ rows: newrows });
      //this.setState({ showModal: true });
      
      await this.dedup.checkForDuplicate(contact)
        .then((data) => this.setState({ rows: data, showModal: true }))
        .catch(error => console.log(error));
    } else {
      console.log('do not run duplicate check!');
    }
    
    this.props.handleBlur(event);
  }

  rowGetter = i => {
    return this.state.rows[i];
  };

  secondModalRowGetter = i => {
    return this.state.rows2[i];
  };
  
  onRowsSelected = async rows => {
    debugger;

    let contactid = rows[0].row.contactid;
    console.log("Selected ContactId is: " + contactid);
    await this.sales.retrieveLeadDataForContactId(contactid)
      .then((data) => this.setState({ rows2: data, showSecondModal: true }))
      .catch(error => console.log(error));

    this.setState({
      selectedIndexes: rows.map(r => r.rowIdx)
    });

  };

  onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });
  };

  handleConfirm = (e) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  }

  handleSecondToggle = (e) => {
    this.setState(prevState => ({
      showSecondModal: !prevState.showSecondModal,
    }));
  }

  handleOk = async (e) => {
    this.props.handleSubmit(e)
    // .catch(function() {
    //     toast.error("Please fix the errors before continuing.", {
    //         position: toast.POSITION.TOP_CENTER
    //     });
    // })
    // .finally(this.handleConfirm)
  }
  
  render() {
    const { hasErrors, phoneTypes } = this.state || [];
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
              <Input type="text" 
                name={`lead.${this.props.type}.firstName`} 
                value={this.props.contact.firstName} 
                onChange={this.props.handleChange} 
                onBlur={this.handleDupCheck} 
                autoComplete="off" 
                readOnly={this.props.isReadOnly}
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
                onBlur={this.handleDupCheck} 
                readOnly={this.props.isReadOnly}
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
                value={this.props.contact.phone.number || ''} 
                onBlur={this.handleDupCheck} 
                onChange={this.props.handleChange} 
                placeholder="Phone" 
                readOnly={this.props.isReadOnly}
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
                value={this.props.contact.phone.type || ''} 
                onBlur={this.handleDupCheck}
                onChange={this.props.handleChange} 
                disabled={this.props.isReadOnly}
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
                value={this.props.contact.email} 
                onBlur={this.handleDupCheck} 
                onChange={this.props.handleChange} 
                placeholder="Email" 
                readOnly={this.props.isReadOnly}
              />
              <ErrorMessage name={`lead.${this.props.type}.email`} render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>

        {this.props.duplicateCheck &&
          <Modal isOpen={this.state.showModal} size="lg">
            <ModalHeader toggle={this.handleConfirm}>
              {"Potential Contact Matches"}
            </ModalHeader>
            <ModalBody>
              <ReactDataGrid
                columns={this.firstmodalcolumns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.rows.length}
                minHeight={150}
                minWidth={750}
                emptyRowsView={EmptyRowsView}
                rowSelection={{
                  showCheckbox: true,
                  enableShiftSelect: false,
                  onRowsSelected: this.onRowsSelected,
                  //onRowsDeselected: this.onRowsDeselected,
                  selectBy: {
                    indexes: this.state.selectedIndexes
                  }
                }}
              />
              <Modal isOpen={this.state.showSecondModal} size="lg">
                <ModalHeader toggle={this.handleSecondToggle}>
                  {"Potential Lead Matches"}
                </ModalHeader>
                <ModalBody>
                  <ReactDataGrid
                    columns={this.secondmodalcolumns}
                    rowGetter={this.secondModalRowGetter}
                    rowsCount={this.state.rows2.length}
                    minHeight={150}
                    minWidth={750}
                    emptyRowsView={EmptyRowsView}
                    // rowSelection={{
                    //   showCheckbox: true,
                    //   enableShiftSelect: false,
                    //   onRowsSelected: this.onRowsSelected,
                    //   //onRowsDeselected: this.onRowsDeselected,
                    //   selectBy: {
                    //     indexes: this.state.selectedIndexes
                    //   }
                    // }}
                  />
                </ModalBody>
              </Modal>
            </ModalBody>
            <ModalFooter>
                {!hasErrors &&
                  <ModalButtonBar handleConfirm={this.handleConfirm} handleSubmit={this.handleOk} />
                }
            </ModalFooter>
          </Modal>
        }

        {this.props.children}
      </>
    )
  }
}

function ModalButtonBar(props) {
  return (
      <React.Fragment>
          <Button type="button" color="secondary" size="sm" onClick={props.handleConfirm}>Continue</Button>
      </React.Fragment>
  )
}

Contact.propTypes = {
  type: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,

  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
  duplicateCheck: PropTypes.bool,
}

Contact.defaultProps = {
  isReadOnly: false,
  duplicateCheck: false,
}
