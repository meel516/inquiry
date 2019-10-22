import React from 'react';
import { Col, Input, FormGroup, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

import Contact from './Contact';
import Note from './Note';

import { ObjectMappingService } from '../services/Types'

export default class SecondPerson extends React.Component {
  state = {
    containsSecondPerson: false,
  }

  handleSecondPerson = (e) => {
    const {target: {name, checked}} = e;
    this.setState({
      containsSecondPerson: checked,
    })
    if (!checked) {
      this.handleContactReset();
    }
    else {
      const { setFieldValue } = this.props;
      setFieldValue(name, true)
    }
  }

  handleContactReset = () => {
    const { setFieldValue } = this.props;
    const secondPerson = ObjectMappingService.createEmptyContact();
    secondPerson.selected = false
    setFieldValue('lead.secondPerson', secondPerson);
    setFieldValue('lead.notes.secondPerson', '');
  }

  renderQuestion = () => {
    return (
      <Row>
        <Col>
          <FormGroup check disabled={this.props.isReadOnly}>
            <Label check className="label-format">
              <Input type="checkbox" name={'lead.secondPerson.selected'} onClick={(e) => this.handleSecondPerson(e)} disabled={this.props.isReadOnly} />
              Is there a 2nd Prospect?
            </Label>
          </FormGroup>
        </Col>
      </Row>
    )
  }

  render() {
    const isSecondPersonShown = this.state.containsSecondPerson;
    if (isSecondPersonShown) {
      return (
        <>
          {this.renderQuestion()}
          <Contact
            key="second-contact"
            type="secondPerson"
            contact={this.props.contact}
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
            readOnly={this.props.isReadOnly}
            {...this.props} />
          <Note 
            labelId="situation2Label" 
            label="2nd Person Situation" 
            id="situation2" 
            name="lead.notes.secondPerson" 
            onChange={this.props.handleChange} 
            onBlur={this.props.handleBlur}
            isReadOnly={this.props.readOnly}
          />
        </>
      )
    } else {
      return this.renderQuestion()
    }
  }
}

SecondPerson.propTypes = {
  type: PropTypes.string,

  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,

  contact: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool,
}

SecondPerson.defaultProps = {
  isReadOnly: false
}