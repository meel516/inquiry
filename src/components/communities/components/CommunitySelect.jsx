import React, { useCallback, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Input, Select, ReactSelect } from '../../formik-inputs';
import Visit from './Visit';
import { defaultVisitNotes } from '../../../constants/defaultVisitNotes';
import { useFormikContext } from 'formik';

export const CommunitySelect = ({ index, communityList, onRemove, followupOptions }) => {
  const [ selectedAction, setSelectedAction ] = useState(null);
  const { setFieldValue, status: { readOnly } } = useFormikContext();
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
    }
  }, [index]);

  const handleFollowupAction = useCallback((optn) => {
    setFieldValue(inputNames.note, defaultVisitNotes[optn.target.value] || '');
    setSelectedAction(optn.target.value);
  }, [inputNames, setSelectedAction, setFieldValue]);

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
            <Col md="4">
              <FormGroup>
                <Label for={inputNames.followUpAction} className='label-format'>Next Steps Action</Label>
                <Select name={inputNames.followUpAction} options={followupOptions} onChange={handleFollowupAction} placeholder='Select One'>
                  {followupOptions}
                </Select>
              </FormGroup>
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
}
