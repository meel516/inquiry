import React from 'react';
import { Button, Card, CardBody, CardFooter, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'

import CommunityLookup from './CommunityLookup'
import Visit from './Visit';
import { getFollowupActions } from '../services/dropdowns'

export default class CommunitySelect extends React.Component {
  state = {
    selectedAction: null,
    followupActions: [],
  }

  componentDidMount() {
    getFollowupActions()
      .then((data) => this.setState({ followupActions: data }))
      .catch((err) => console.error("Error", err));
  }

  handleRemoveCommunity = () => {
    this.props.onRemove();
  }

  handleFollowupAction = (optn) => {
    const { index, setFieldValue } = this.props;
    setFieldValue(`communities[${index}].followUpAction`, optn.target.value);
    this.setState({ selectedAction: optn.target.value })
  }

  render() {
    const { selectedAction, followupActions } = this.state;
    const followupOptns = (followupActions || []).map((optn) => {
      return <option key={optn.value} value={optn.value}>{optn.text}</option>
    })

    return (
      <div className="communities-container">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <CommunityLookup 
                  index={this.props.index}
                  isReadOnly={this.props.isReadOnly}
                  setFieldValue={this.props.setFieldValue}
                />
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
                      name={`communities[${this.props.index}].startingPrice`}
                      value={this.props.community.startingPrice || ''}
                      onChange={this.props.handleChange}
                      onBlur={this.props.handleBlur}
                      readOnly={this.props.isReadOnly}
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
                      name={`communities[${this.props.index}].secondPersonFee`}
                      value={this.props.community.secondPersonFee || ''}
                      onChange={this.props.handleChange}
                      onBlur={this.props.handleBlur}
                      readOnly={this.props.isReadOnly}
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
                      name={`communities[${this.props.index}].communityFee`}
                      value={this.props.community.communityFee || ''}
                      onChange={this.props.handleChange}
                      onBlur={this.props.handleBlur}
                      readOnly={this.props.isReadOnly}
                      placeholder="Common Starting Rate" />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="action" className="label-format">Next Steps Action</Label>
                  <Input type="select" id="action" onChange={this.handleFollowupAction} disabled={this.props.isReadOnly}>
                    <option value="">Select One</option>
                    {followupOptns}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {
              (selectedAction) ? 
                <Visit 
                  handleChange={this.props.handleChange} 
                  handleBlur={this.props.handleBlur} 
                  isReadOnly={this.props.isReadOnly} 
                  {...this.props} 
                /> 
              : null
            }
          </CardBody>
          <CardFooter className="text-right">
            { (this.props.isReadOnly === false) 
              ? <Button color="primary" size="sm" onClick={this.handleRemoveCommunity}>Remove</Button>
              : null
            }
          </CardFooter>
        </Card>
      </div>
    )
  }
}

CommunitySelect.propTypes = {
  community: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,

  onRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,

  isReadOnly: PropTypes.bool
}

CommunitySelect.defaultProps = {
  isReadOnly: false,
}
