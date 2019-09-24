import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row} from 'reactstrap';

import CommunityLookup from './CommunityLookup'
import Visit from './Visit';
import {getFollowupActions} from '../services/SalesServices'

export default class CommunitySelect extends React.Component {
  state = {
    selectedAction: null,
    followupActions: [],
  }

  componentDidMount() {
    getFollowupActions()
      .then((data) => this.setState({followupActions: data}))
      .catch((err) => console.error("Error", err));
  }

  handleRemoveCommunity = () => {    
    this.props.onRemove();
  }

  handleFollowupAction = (optn) => {
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].followUpAction`, optn.target.value);
    this.setState({selectedAction: optn.target.value})
  }

  render () {
    const {selectedAction, followupActions} = this.state;
    const {community, index, handleChange, handleBlur} = this.props;
    const followupOptns = (followupActions||[]).map((optn) => {
      return <option key={optn.value} value={optn.value}>{optn.text}</option>
    })

   return (
     <div className="communities-container">
       <Card>
         <CardBody>
           <Row>
             <Col>
               <CommunityLookup {...this.props}/>
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
                      value={community.startingPrice||0} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      placeholder="Starting at Price"/>
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
                      value={community.secondPersonFee||0} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      placeholder="2nd Person Fee" />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="communityFee" className="label-format">Community Fee</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" 
                      id="communityFee" 
                      name={`communities[${index}].communityFee`}
                      value={community.communityFee|0} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      placeholder="Community Fee" />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="action" className="label-format">Next Steps Action</Label>
                  <Input type="select" id="action" onChange={this.handleFollowupAction}>
                    <option value="">Select One</option>
                    {followupOptns}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {
              ( selectedAction ) ? <Visit  onChange={this.props.handleChange} {...this.props}/> : null
            }
        </CardBody>
        <CardFooter className="text-right">
          <Button color="primary" size="sm" onClick={this.handleRemoveCommunity}>Remove</Button>
        </CardFooter>
      </Card>
    </div>
   )
 }
}

// CommunitySelect.propTypes = {
//   onRemove: PropTypes.func,
//   onChange: PropTypes.func,
// }
