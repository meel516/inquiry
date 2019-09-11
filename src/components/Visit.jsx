import React from 'react';
import { Col, Input, FormGroup, Label, Row } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
//import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

const freeMealList = [
  { value: 1, label: "No" },
  { value: 2, label: "Lunch" },
  { value: 3, label: "Dinner" },
];

export default class Visit extends React.Component {

  onMealOptionChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].${name}`, value);
  }

  render() {
    return (
      <>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label for="freeMeal" className="label-format">This Visit include a Free Meal?</Label>
              <Input type="select" id="freeMeal" name="freeMeal" onChange={this.onMealOptionChange}>
                {freeMealList.map((optn) => {
                  return <option key={optn.value} value={optn.value}>{optn.label}</option>
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col md={{ size: 4, offset: 2}} style={{ verticalAlign: 'bottom' }}>
            <FollowUp {...this.props} />
          </Col>
        </Row>
      </>
    )
  }
}

class FollowUp extends React.Component {
  state = {
    followupDate: new Date(),
  }

  onScheduledDateChange = (date) => {
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].scheduledDate`, date);
    console.log(`Scheduled Date: ${date}`);
    this.setState({ followupDate: date })
  }

  render() {
    return (
      <FormGroup>
        <Label for="scheduledDate" className="label-format">Scheduled Date</Label>
        <DateTimePicker
          name="scheduledDate"
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
