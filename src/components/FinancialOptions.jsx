import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

export default class FinancialOptions extends React.Component {

  handleInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.financialOptions.".concat(name);
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, checked);
  };

  render() {
    return (
      <>
        <section className="financialOptions">
          <Label for="financialOptions" className="label-format">Financial Options</Label>
          <Row>
            <Col>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="aidAttendance" onChange={this.handleInputChange} disabled={this.props.isReadOnly}/>{' '}
                  Aid & Attendance
                  </Label>
              </FormGroup>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="familyContributions" onChange={this.handleInputChange} disabled={this.props.isReadOnly}/>{' '}
                  Family Contributions
                  </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="homeOwner" onChange={this.handleInputChange} disabled={this.props.isReadOnly}/>{' '}
                  Home Owner
                  </Label>
              </FormGroup>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="ltcPolicy" onChange={this.handleInputChange} disabled={this.props.isReadOnly}/>{' '}
                  LTC Policy
                  </Label>
              </FormGroup>
            </Col>
          </Row>
        </section>
      </>
    )
  }
}

FinancialOptions.propTypes = {
  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

FinancialOptions.defaultProps = {
  isReadOnly: false,
}