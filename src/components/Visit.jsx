import React from 'react';
import { Col, Input, FormGroup, Label, Row } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import Note from './Note'

const freeMealList = [
  { value: 1, label: "No" },
  { value: 2, label: "Lunch" },
  { value: 3, label: "Dinner" },
];

export default class Visit extends React.Component {
  state = {
    action: "",
  }

  handleVisitChanges = e => {
    const name = e.target.name;
    const value = e.target.value;
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].${name}`, value);
  }

  render() {
    const {community} = this.props;
    console.log(`Visit: ${JSON.stringify(community)}`);
    return (
      <>
        <Row>
          <Col md="4">
            <FollowUp {...this.props} />
          </Col>
          <Col md="4" style={{ verticalAlign: 'bottom' }}>
            <FormGroup>
              {
                (community && (community.followUpAction === "20" ||
                  community.followUpAction === "5")) ? <FreeMeal onChange={this.handleVisitChanges} /> : null
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Note label="Description" id="followupNote" name={`communities[${this.props.index}].note`} onChange={this.props.handleChange} onBlur={this.props.handleBlur}/>
          </Col>
        </Row>
      </>
    )
  }
}

function FreeMeal(props) {
  return (
    <React.Fragment>
      <Label for="freeMeal" className="label-format">Does this Visit include a Free Meal?</Label>
      <Input type="select" id="freeMeal" name="freeMeal" onChange={props.onChange}>
        {freeMealList.map((optn) => {
          return <option key={optn.value} value={optn.value}>{optn.label}</option>
        })}
      </Input>
    </React.Fragment>
  )
}

class FollowUp extends React.Component {
  state = {
    followupDate: new Date(),
  }

  onScheduledDateChange = (date) => {
    const {index, setFieldValue} = this.props;
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
          value={this.props.community.scheduledDate||this.state.followupDate}
        />
      </FormGroup>
    )
  }
}
