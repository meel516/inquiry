import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';

class FollowUp extends React.Component {
    state = {
      followupDate: null,
    }
  
    onScheduledDateChange = (date) => {
      this.props.onFollowupDateChange(date)
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
            disabled={this.props.isReadOnly}
          />
        </FormGroup>
      )
    }
  }
  
  FollowUp.propTypes = {
    index: PropTypes.number.isRequired,
    onFollowupDateChange: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool,
  }
  
  FollowUp.defaultProps = {
    isReadOnly: false,
  }

  export default FollowUp;