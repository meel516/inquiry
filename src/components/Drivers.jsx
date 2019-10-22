import React from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

export default class Drivers extends React.Component {

  handleInputChange = ({ target: { name, checked } }) => {
    const qualifiedName = "lead.drivers.".concat(name);
    const { setFieldValue } = this.props;
    setFieldValue(qualifiedName, checked);
  };


  render() {
    return (
      <>
        <section className="drivers">
          <Label for="drivers" className="label-format">Drivers</Label>
          <Row>
            <Col>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="activities" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Activities
                </Label>
              </FormGroup>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="accessToResidents" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Access to Residents
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-3" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="ageInPlace" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Age in Place
              </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="care" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Care
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="location" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Location
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-3" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="peaceOfMind" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Peace of mind
              </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="petFriendly" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Pet friendly
              </Label>
              </FormGroup>
              <FormGroup check inline className="col-4" disabled={this.props.isReadOnly}>
                <Label check>
                  <Input type="checkbox" name="safety" onChange={this.handleInputChange} readOnly={this.props.isReadOnly} />{' '}
                  Safety
              </Label>
              </FormGroup>
            </Col>
          </Row>
        </section>
      </>
    )
  }
}

Drivers.propTypes = {
  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool,
}

Drivers.defaultProps = {
  isReadOnly: false,
}