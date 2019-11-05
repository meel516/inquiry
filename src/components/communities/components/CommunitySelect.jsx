import React, { useCallback, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Visit from './Visit';

export const CommunitySelect = (props) => {
  const [ selectedAction, setSelectedAction ] = useState(null);
  const { index, onCommunityChange, onFollowupActionChange, community, isReadOnly, communityList, handleChange, handleBlur, onRemove, followupOptions } = props;

  const handleFollowupAction = useCallback((optn) => {
    onFollowupActionChange(optn.target.value, index);
    setSelectedAction(optn.target.value);
  }, [index, onFollowupActionChange, setSelectedAction]);

  const handleCommunityChange = useCallback((optn) => {
    onCommunityChange(optn.value, index);
  }, [index, onCommunityChange]);

  return (
    <div className="communities-container">
      <Card>
        <CardBody>
          <Row>
            <Col>
            <FormGroup>
              <Label for="communityList" className="label-format">Community</Label>
              <Select
                  name="communityId"
                  onChange={handleCommunityChange}
                  options={communityList}
                  isDisabled={isReadOnly}
              />
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="startingPrice" className="label-format">Starting at Price</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input type="number"
                    id="startingPrice"
                    name={`communities[${index}].startingPrice`}
                    value={community.startingPrice || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={isReadOnly}
                    placeholder="Starting at Price"
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="secondPersonFee" className="label-format">2nd Person Fee</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input type="number"
                    id="secondPersonFee"
                    name={`communities[${index}].secondPersonFee`}
                    value={community.secondPersonFee || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={isReadOnly}
                    placeholder="2nd Person Fee" />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="communityFee" className="label-format">Common Starting Rate</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input type="number"
                    id="communityFee"
                    name={`communities[${index}].communityFee`}
                    value={community.communityFee || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={isReadOnly}
                    placeholder="Common Starting Rate" />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for="action" className="label-format">Next Steps Action</Label>
                <Input type="select" id="action" onChange={handleFollowupAction} disabled={isReadOnly}>
                  <option value="">Select One</option>
                  {followupOptions}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          {
            (selectedAction) ? 
              <Visit 
                handleChange={handleChange} 
                handleBlur={handleBlur} 
                isReadOnly={isReadOnly} 
                {...props} 
              /> 
            : null
          }
        </CardBody>
        <CardFooter className="text-right">
          { (isReadOnly === false) 
            ? <Button color="primary" size="sm" onClick={() => onRemove()}>Remove</Button>
            : null
          }
        </CardFooter>
      </Card>
    </div>
  );
}

CommunitySelect.propTypes = {
  community: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  onCommunityChange: PropTypes.func.isRequired,
  onFollowupActionChange: PropTypes.func.isRequired,
  onFollowupDateChange: PropTypes.func.isRequired,
  handleVisitChanges: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
  communityList: PropTypes.array,
  followupActions: PropTypes.array,
}

CommunitySelect.defaultProps = {
  isReadOnly: false,
}
