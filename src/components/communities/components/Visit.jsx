import React, { useCallback, useMemo } from 'react';
import { Col, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Note from '../../Note';
import FollowUp from './FollowUp';
import FreeMeal from './FreeMeal';

const freeMealFollowUpActions = new Set([
  "20", // Guest Stay
  "5", // Visit/Appt Scheduled
])

const Visit = (props) => {
  const { index, handleVisitChanges, onFollowupDateChange, community } = props;

  const handleFollowupDateChange = useCallback((date) => {
    onFollowupDateChange(date, index);
  }, [index, onFollowupDateChange]);

  const onVisitChange = useCallback(e => {
    const { name, value } = e.target;
    handleVisitChanges(value, index, name);
  }, [index, handleVisitChanges]);

  const showFreeMeal = useMemo(() => {
    return community && freeMealFollowUpActions.has(community.followUpAction); 
  }, [community]);

  return (
    <>
      <Row>
        <Col md="4">
          <FollowUp
            setFieldValue={props.onFollowU}
            handleBlur={props.handleBlur}
            isReadOnly={props.isReadOnly}
            onFollowupDateChange={handleFollowupDateChange}
          />
        </Col>
        <Col md="4" style={{ verticalAlign: 'bottom' }}>
          <FormGroup>
            {
              showFreeMeal ? (
                <FreeMeal
                  handleChange={onVisitChange}
                  isReadOnly={props.isReadOnly}
                />
              ) : null
            }
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Note
            labelId="followupNoteLabel"
            label="Description"
            id="followupNote"
            name={`communities[${props.index}].note`}
            value={props.community.note}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            isReadOnly={props.isReadOnly}
          />
        </Col>
      </Row>
    </>
  )
}

Visit.propTypes = {
  community: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleVisitChanges: PropTypes.func.isRequired,
  onFollowupDateChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool
}

Visit.defaultProps = {
  isReadOnly: false
}

export default Visit;