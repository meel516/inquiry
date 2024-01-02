import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Input, Select, ReactSelect } from '../../formik-inputs';
import Visit from './Visit';
import { useFormikContextWrapper } from '../../../hooks';
import { getEventDetails, getEventAddlDetails } from '../../../services/dropdowns';
import { defaultVisitNotes } from '../../../constants/defaultVisitNotes';
import {StyledCheckboxGroupWrapper} from '../../checkbox-groups/styled';
import {Checkbox} from '../../form-items';

export const CommunitySelect = ({ index, communityList, onRemove, followupOptions }) => {
  const [ selectedAction, setSelectedAction ] = useState(null);
  const [ selectedEventDetail, setSelectedEventDetail ] = useState(null);
  const { setFieldValue, status: { readOnly } } = useFormikContextWrapper();
  const [ eventDetails, setEventDetails ] = useState([]);
  const [ eventAddlDetails, setEventAddlDetails ] = useState([]);

  const SMS_FUACTION_SEAC = 52; // Special Event at Community - SMS Follow Up Action
  const SMS_ILS_SEAC = 15; // Special Event at Community - SMS Inquiry Lead Source

  const inputNames = useMemo(() => {
    return {
      communityId: `communities[${index}].communityId`,
      freeMeal: `communities[${index}].freeMeal`,
      followupDate: `communities[${index}].followupDate`,
      note: `communities[${index}].note`,
      followUpAction: `communities[${index}].followUpAction`,
      startingPrice: `communities[${index}].startingPrice`,
      secondPersonFee: `communities[${index}].secondPersonFee`,
      communityFee: `communities[${index}].communityFee`,
      eventDetail: `communities[${index}].eventDetail`,
      eventAddlDetail: `communities[${index}].eventAddlDetail`,
      spotlightDiscussed: `communities[${index}].spotlightDiscussed`
    }
  }, [index]);

  const eventDetailOptions = useMemo(() => {
    return eventDetails.map(source => {
      return <option key={source.value} value={source.value}>{source.text}</option>;
    })
  }, [eventDetails]);

  const eventAddlDetailOptions = useMemo(() => {
    return eventAddlDetails.map(source => {
      return <option key={source.value} value={source.value}>{source.text}</option>;
    })
  }, [eventAddlDetails]);

  const handleFollowupAction = useCallback((optn) => {
    if (!optn.target) {
      setFieldValue(inputNames.followUpAction, 0);
      setEventDetails([]);
    }

    setFieldValue(inputNames.note, defaultVisitNotes[optn.target.value] || '');
    setFieldValue(inputNames.eventDetail, 0);
    setFieldValue(inputNames.eventAddlDetail, 0);
    setSelectedAction(optn.target.value);
  }, [inputNames, setSelectedAction, setFieldValue, setEventDetails]);

  const onEventDetailChange = useCallback((optn) => {
    if (!optn.target) {
      setFieldValue(inputNames.eventDetail, 0);
      setEventAddlDetails([]);
    }

    setFieldValue(inputNames.eventAddlDetail, 0);
    setSelectedEventDetail(optn.target.value);
  }, [setEventAddlDetails, setFieldValue, inputNames]);

  useEffect(() => {
    async function getAndSetEventDetails () {
      const details = await getEventDetails(SMS_ILS_SEAC);
      setEventDetails(details.map(detail => ({ ...detail, value: parseInt(detail.value, 10) })));
      setFieldValue(inputNames.eventDetailOptions, details);
    }

    if (selectedAction && parseInt(selectedAction) === SMS_FUACTION_SEAC) {
      // Action is Special Event at Community...grab the event details!
      getAndSetEventDetails();
    } else {
      setEventDetails([]);
    }
  }, [selectedAction, setFieldValue, inputNames])

  useEffect(() => {
    async function getAndSetEventAddlDetails () {
      const addldetails = await getEventAddlDetails(parseInt(selectedEventDetail));
      setEventAddlDetails(addldetails.map(addldetail => ({ ...addldetail, value: parseInt(addldetail.value, 10) })));
      setFieldValue(inputNames.eventAddlDetailOptions, addldetails);
    }

    if (selectedEventDetail && parseInt(selectedEventDetail) > 0) {
      // Event Detail is there...grab the event add'l details!
      getAndSetEventAddlDetails();
    } else {
      setEventAddlDetails([]);
    }
  }, [selectedEventDetail, setFieldValue, inputNames])

  return (
    <div className="communities-container">
      <Card>
        <CardBody>
          <Row>
            <Col>
            <FormGroup>
              <Label for={inputNames.communityId} className='label-format'>Community</Label>
              <ReactSelect name={inputNames.communityId} options={communityList} />
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for={inputNames.startingPrice} className="label-format">Starting at Price</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input name={inputNames.startingPrice} type='number' placeholder='Starting at Price' />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for={inputNames.secondPersonFee} className="label-format">2nd Person Fee</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input name={inputNames.secondPersonFee} type='number' placeholder='2nd Person Fee' />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for={inputNames.communityFee} className="label-format">Common Starting Rate</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input name={inputNames.communityFee} type='number' placeholder='Common Starting Rate' />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledCheckboxGroupWrapper>
                <Checkbox name={inputNames.spotlightDiscussed} label='Spotlight discussed' />
              </StyledCheckboxGroupWrapper>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for={inputNames.followUpAction} className='label-format'>Next Steps Action</Label>
                <Select name={inputNames.followUpAction} onChange={handleFollowupAction}>
                  {followupOptions}
                </Select>
              </FormGroup>
            </Col>
            <Col md="4">
              { selectedAction && parseInt(selectedAction) === SMS_FUACTION_SEAC &&
                <FormGroup>
                  <Label for={inputNames.eventDetail} className='label-format'>Event Detail</Label>
                  <Select name={inputNames.eventDetail} onChange={onEventDetailChange}>
                    {eventDetailOptions}
                  </Select>
                </FormGroup>
              }
            </Col>
            <Col md="4">
              { selectedAction && parseInt(selectedAction) === SMS_FUACTION_SEAC &&
                <FormGroup>
                  <Label for={inputNames.eventAddlDetail} className='label-format'>Event Add'l Detail</Label>
                  <Select name={inputNames.eventAddlDetail}>
                    {eventAddlDetailOptions}
                  </Select>
                </FormGroup>
              }
            </Col>
          </Row>
          {
            selectedAction ? <Visit inputNames={inputNames} followUpAction={selectedAction} /> : null
          }
        </CardBody>
        <CardFooter className="text-right">
          { (readOnly === false) 
            ? <Button color="primary" size="sm" onClick={() => onRemove()}>Remove</Button>
            : null
          }
        </CardFooter>
      </Card>
    </div>
  );
}

CommunitySelect.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func.isRequired,
  communityList: PropTypes.array,
  followupActions: PropTypes.array,
  spotlightDiscussed: PropTypes.bool
}
