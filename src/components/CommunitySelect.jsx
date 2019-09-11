import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Visit from './Visit';
import {fetchCommunities} from '../services/CommunityServices'
import {getFollowupActions} from '../services/SalesServices'

import Select from 'react-select';

// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
// const nextStepsOptions = [
//   {value: 1, label: 'Visit Scheduled'},
//   {value: 3, label: 'Assessment Scheduled'},
//   {value: 2, label: 'Home Visit Scheduled'},
//   {value: 4, label: 'Lead No Visit & Transfer to Community'},
//   {value: 5, label: 'Event RSVP Transfer to Community'},
//   {value: 7, label: 'No Contact & Transfer to Community'},
// ];

export default class CommunitySelect extends React.Component {
  state = {
    communityList: [],
    selectedAction: null,
    followupActions: [],
  }

  componentDidMount() {
    console.log('called componentDidMount on community form');
    fetchCommunities()
    .then((data) => {
      var communities = data.map((com) => {
        return { value: com.id, label: com.buildingName }
      });
      this.setState({communityList: communities});
    })
    .catch((err) => console.error("Error", err));

    getFollowupActions()
      .then((data) => this.setState({followupActions: data}))
      .catch((err) => console.error("Error", err));
  }

  componentWillUnmount() {
    console.log('called componentWillUnmount on community form');
  }

  handleRemoveCommunity = () => {
    this.props.onRemove();
  }

  handleNextSteps = (optn) => {
    console.log(`Option selected: ${JSON.stringify(optn.target.value)}`);
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].followUpAction`, optn.target.value);
    this.setState({selectedAction: optn.target.value})
  }

  handleCommunityChange = (optn) => {
    console.log(`Community Selected: ${optn}`);
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].communityId`, optn.value);
  }

  render () {
    const {selectedAction, followupActions} = this.state;
    const {community, handleChange, handleBlur} = this.props;
    const followupOptns = (followupActions||[]).map((optn) => {
      return <option key={optn.value} value={optn.value}>{optn.text}</option>
    })

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
                    onChange={this.handleCommunityChange}
                    options={this.state.communityList}
                  />
                </FormGroup>
             </Col>
           </Row>
           <Row>
             <Col>
                <FormGroup>
                  <Label for="startingPrice" className="label-format">Starting at Price</Label>
                  <Input type="number" 
                    id="startingPrice" 
                    name={`communities[${arrayIndex}].startingPrice`} 
                    value={community.startingPrice||0} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Starting at Price"/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="secondPersonFee" className="label-format">2nd Person Fee</Label>
                  <Input type="number" 
                    id="secondPersonFee" 
                    name={`communities[${arrayIndex}].secondPersonFee`}
                    value={community.secondPersonFee||0} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="2nd Person Fee" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="communityFee" className="label-format">Community Fee</Label>
                  <Input type="number" 
                    id="communityFee" 
                    name={`communities[${arrayIndex}].communityFee`}
                    value={community.communityFee|0} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Community Fee" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="5">
                <FormGroup>
                  <Label for="action" className="label-format">Action</Label>
                  <Input type="select" id="action" onChange={this.handleNextSteps}>
                    <option value=""></option>
                    {followupOptns}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {
              ( selectedAction ) ? <Visit onChange={this.props.handleChange} {...this.props}/> : null
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

CommunitySelect.propTypes = {
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
}
