import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';

const FollowUp = (props) => {
  const [ followupDate, setFollowupDate ] = useState(null);
  const { onFollowupDateChange } = props;

  const onScheduledDateChange = useCallback((date) => {
    onFollowupDateChange(date);
    setFollowupDate(date);
  }, [setFollowupDate, onFollowupDateChange]);

  return (
    <FormGroup>
      <Label for="followupDate" className="label-format">Next Steps Date</Label>
      <DateTimePicker
        name="followupDate"
        className="no-border form-control"
        disableClock={true}
        showWeekNumbers={true}
        onChange={onScheduledDateChange}
        value={followupDate}
        disabled={props.isReadOnly}
      />
    </FormGroup>
  );
}
  
FollowUp.propTypes = {
  onFollowupDateChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
}

FollowUp.defaultProps = {
  isReadOnly: false,
}

export default FollowUp;