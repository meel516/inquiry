import React from 'react';
import { Col, Input, FormGroup, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

import Contact from './Contact';
import Note from './Note';

import { ObjectMappingService } from '../services/Types'

PropTypes.SecondPerson = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,

  type: PropTypes.string.isRequired,
  contact: PropTypes.instanceOf(Contact).isRequired,
}


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
          <FormGroup check>
            <Label check className="label-format">
              <Input type="checkbox" name={'lead.secondPerson.selected'} onClick={(e) => this.handleSecondPerson(e)} />
              Is there a 2nd Prospect?
            </Label>
          </FormGroup>
        </Col>
      </Row>
    )
  }

  render() {
    const { handleChange, handleBlur } = this.props;
    const isSecondPersonShown = this.state.containsSecondPerson;
    if (isSecondPersonShown) {
      return (
        <>
          {this.renderQuestion()}
          <Contact
            type="secondPerson"
            contact={this.props.contact}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            {...this.props} />
          <Note label="2nd Person Situation" id="situation2" name="lead.notes.secondPerson" onChange={handleChange} onBlur={handleBlur} />
        </>
      )
    } else {
      return this.renderQuestion()
    }
  }
}
