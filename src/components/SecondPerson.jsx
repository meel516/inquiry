import React from 'react';
import { Col, Input, FormGroup, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import Contact from './Contact';
import Note from './Note';
import { ObjectMappingService } from '../services/Types'

export default class SecondPerson extends React.Component {
  state = {
    containsSecondPerson: false,
    locked: false,
  }

  componentDidMount() {
    if (this.props.contact) {
      const { selected, contactId } = this.props.contact;
      let containsSecondPerson = (selected) ? selected : false;
      let locked = (contactId) ? true : false
      this.setState({
        containsSecondPerson,
        locked
      })
    }
  }

  componentDidUpdate() {
    if (this.props.contact) {
      const { selected, contactId } = this.props.contact;
      const { containsSecondPerson } = this.state;
      if (selected !== containsSecondPerson) {
        this.setState({
          containsSecondPerson: selected,
          locked: (contactId ? true : false)
        })
      }
    }
  }

  handleSecondPerson = (e) => {
    const { target: { name, checked } } = e;
    this.setState({
      containsSecondPerson: checked,
    })
    if (!checked) {
      this.handleContactReset();
    }
    else {
      this.props.setFieldValue(name, true)
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
          <FormGroup check disabled={this.props.isReadOnly || this.state.locked}>
            <Label check className="label-format">
              <Input 
                type="checkbox" 
                name={'lead.secondPerson.selected'} 
                onChange={(e) => this.handleSecondPerson(e)}
                checked={(this.state.containsSecondPerson ? this.state.containsSecondPerson : (this.props.contact.contactId ? true : false))}
                disabled={this.props.isReadOnly || this.state.locked}
              />
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
            duplicateCheck={this.props.duplicateCheck}
            hasAddress={false}
            {...this.props} />
          <Note
            labelId="situation2Label"
            label="2nd Person Situation"
            id="secondPersonNote"
            handleChange={this.props.handleChange}
            handleBlur={this.props.handleBlur}
            isReadOnly={this.props.isReadOnly}
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
  duplicateCheck: PropTypes.bool,
}

SecondPerson.defaultProps = {
  isReadOnly: false,
  duplicateCheck: false,
}