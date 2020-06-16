import React, { useCallback, useMemo } from 'react';
import { Form, withFormik } from 'formik';
import { FormikContextWrapper } from '../hooks';
import { Col, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';

const Section = ({
  values,
}) => {
  const buildSmsLeadLink = useCallback((lead) => {
    if (lead && lead.leadId) {
      return `${process.env.REACT_APP_SALES_URL}?smsLeadId=${lead.leadId}&targetSimsPage=NOTES&buildingId=${lead.buildingId}`;
    } else {
      return null;
    }
  }, [ ]);

  const { lead } = values;
  
  const wrappedFormikValues = useMemo(() => {
    return { lead };
  }, [ lead ]);

  return (
    <Form>
      <FormikContextWrapper.Provider value={wrappedFormikValues}>
        <Row>
          <Col>
            <ListGroup className="list-group-flush">
              <ListGroupItem className="list-group-borderless">
                <Label className="label-format" >Section Links</Label>
              </ListGroupItem>
              <ListGroupItem className="list-group-borderless">
                <a href="#contactInfo">Contact Info</a>
              </ListGroupItem>
              <ListGroupItem className="list-group-borderless">
                <a href="#situation">Situation</a>
              </ListGroupItem>
              <ListGroupItem className="list-group-borderless">
                <a href="#passionPersonality">Passions & Personality</a>
              </ListGroupItem>
              <ListGroupItem className="list-group-borderless">
                <a href="#budget">Budget</a>
              </ListGroupItem>
              <ListGroupItem className="list-group-borderless">
                <a href="#resultOfCall">Result of Call</a>
              </ListGroupItem>
              {
                (lead != null && lead.leadId != null) &&
                  (
                    <ListGroupItem className="list-group-borderless">
                      <a href={buildSmsLeadLink(lead)} target="_blank" rel="noopener noreferrer">SMS Lead Link</a>
                    </ListGroupItem>
                  )
              }
            </ListGroup>
          </Col>
        </Row>
      </FormikContextWrapper.Provider>
    </Form>
  );
}

const EnhancedSection = withFormik({
  displayName: 'Section',
  enableReinitialize: true,
  mapPropsToValues: ({ lead }) => ({ lead }),
})(Section);

export default EnhancedSection;