import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

export default class AdlNeeds extends React.Component {

  handleInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.adlNeeds.".concat(name);
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, checked);
  };

  render() {
    return (
      <>
        <section className="adlNeeds">
          <Label for="adlNeeds" className="label-format">ADL Needs</Label>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="bathing" onChange={this.handleInputChange} readOnly={this.props.isReadOnly}/>{' '}
                  Bathing
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="dressing" onChange={this.handleInputChange} />{' '}
                  Dressing
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-3">
                <Label check>
                  <Input type="checkbox" name="feeding" onChange={this.handleInputChange} />{' '}
                  Feeding
              </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="incontinence" onChange={this.handleInputChange} />{' '}
                  Incontinence
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="medications" onChange={this.handleInputChange} />{' '}
                  Medications
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-3">
                <Label check>
                  <Input type="checkbox" name="toileting" onChange={this.handleInputChange} />{' '}
                  Toileting
              </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4">
                <Label check>
                  <Input type="checkbox" name="transferring" onChange={this.handleInputChange} />{' '}
                  Transferring
              </Label>
              </FormGroup>
            </Col>
          </Row>
        </section>
      </>
    )
  }
}

AdlNeeds.propTypes = {
  adlNeeds: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

AdlNeeds.defaultProps = {
  isReadOnly: false
}
