import React from 'react';
import {Col, Input, FormGroup, Label, Row} from 'reactstrap';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';

const freeMealList = [
  {value: 1, label: "No"},
  {value: 2, label: "Lunch"},
  {value: 3, label: "Dinner"},
];

export default function Visit(props) {
  return (
    <>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="freeMeal">This Visit include a Free Meal?</Label>
              <Select
                defaultValue={freeMealList[0]}
                options={freeMealList}
              />
          </FormGroup>
        </Col>
        <Col md="6">
          <FollowUp />
        </Col>
      </Row>
    </>
  )
}

class FollowUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      followupDate: new Date(),
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(date) {
    this.setState({followupDate: date})
  }

  render() {
    return (
      <FormGroup>
        <Label for="scheduledDate">Scheduled Date</Label>
        <DateTimePicker
          disableClock="true"
          onChange={this.onChange}
          value={this.state.followupDate}
          />
      </FormGroup>
    )
  }
}
