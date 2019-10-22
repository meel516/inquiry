import React from 'react';
import { Col, Input, FormGroup, Label, Row } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import PropTypes from 'prop-types'

import Note from './Note'

import { CommunityService } from '../services/CommunityServices'

export default class Visit extends React.Component {
  state = {
    action: "",
  }

  handleVisitChanges = e => {
    const name = e.target.name;
    const value = e.target.value;
    const { index, setFieldValue } = this.props;
    setFieldValue(`communities[${index}].${name}`, value);
  }

  render() {
    const { community } = this.props;
    return (
      <>
        <Row>
          <Col md="4">
            <FollowUp 
              setFieldValue={this.props.setFieldValue}
              handleChange={this.props.handleChange} 
              handleBlur={this.props.handleBlur} 
              isReadOnly={this.props.isReadOnly} 
              {...this.props}
            />
          </Col>
          <Col md="4" style={{ verticalAlign: 'bottom' }}>
            <FormGroup>
              {
                (community && (community.followUpAction === "20" ||
                  community.followUpAction === "5")) ? <FreeMeal handleChange={this.handleVisitChanges} isReadOnly={this.props.isReadOnly} /> : null
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Note 
              label="Description" 
              id="followupNote" 
              name={`communities[${this.props.index}].note`} 
              onChange={this.props.handleChange} 
              onBlur={this.props.handleBlur} 
              isReadOnly={this.props.isReadOnly}
            />
          </Col>
        </Row>
      </>
    )
  }
}

Visit.propTypes = {
  community: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,

  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool
}

Visit.defaultProps = {
  isReadOnly: false
}

function FreeMeal(props) {
  const freeMealItems = CommunityService.freeMealListing()
  return (
    <React.Fragment>
      <Label for="freeMeal" className="label-format">Does this Visit include a Free Meal?</Label>
      <Input type="select" id="freeMeal" name="freeMeal" onChange={props.handleChange}>
        {freeMealItems.map((optn) => {
          return <option key={optn.value} value={optn.label}>{optn.label}</option>
        })}
      </Input>
    </React.Fragment>
  )
}

class FollowUp extends React.Component {
  state = {
    followupDate: null,
  }

  onScheduledDateChange = (date) => {
    const { index, setFieldValue } = this.props;
    setFieldValue(`communities[${index}].followupDate`, date);
    console.log(`Scheduled Date: ${date}`);
    this.setState({ followupDate: date })
  }

  render() {
    return (
      <FormGroup>
        <Label for="followupDate" className="label-format">Next Steps Date</Label>
        <DateTimePicker
          name="followupDate"
          className="no-border form-control"
          disableClock={true}
          showWeekNumbers={true}
          onChange={this.onScheduledDateChange}
          value={this.props.community.scheduledDate || this.state.followupDate}
        />
      </FormGroup>
    )
  }
}
