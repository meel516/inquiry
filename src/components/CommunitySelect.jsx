import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Visit from './Visit';
import {fetchCommunities} from '../services/CommunityServices'

import Select from 'react-select';

// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
const nextStepsOptions = [
  {value: 1, label: 'Visit Scheduled'},
  {value: 3, label: 'Assessment Scheduled'},
  {value: 2, label: 'Home Visit Scheduled'},
  {value: 4, label: 'Lead No Visit & Transfer to Community'},
  {value: 5, label: 'Event RSVP Transfer to Community'},
  {value: 7, label: 'No Contact & Transfer to Community'},
];

export default class CommunitySelect extends React.Component {
  state = {
    communityList: [],
    selectedOption: null,
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
  }

  componentWillUnmount() {
    console.log('called componentWillUnmount on community form');
  }

  handleRemoveCommunity = () => {
    this.props.onRemove();
  }

  handleSelectCommunity = (optn) => {
    const {setFieldValue, arrayIndex} = this.props;
    const name = `communities[${arrayIndex}].communityId`
    setFieldValue(name, optn.value);
    this.props.setFieldTouched(name, true);
  }

  handleNextSteps = (option) => {
    console.log(`Option selected:`, option);
    this.setState({
      selectedOption: option
    })
  }

  render () {
    const {communityList, selectedOption} = this.state;
    const {community, handleChange, handleBlur, arrayIndex} = this.props;
    console.log(`community[${arrayIndex}]=${community.communityId}`)
    const nextStepsOptns = (nextStepsOptions||[]).map(type => {
      return <option key={type.value} value={type.value}>{type.label}</option>
    });

   return (
     <div className="communities-container">
       <Card>
         <CardBody>
           <Row>
             <Col>
                <FormGroup>
                  <Label for="communityList" className="label-format">Community</Label>
                  <Select
                    name={`communities[${arrayIndex}].communityId`}
                    isSearchable="true"
                    defaultInputValue={community.communityId}
                    value={community.communityId}
                    onChange={this.handleSelectCommunity}
                    options={communityList}
                    placeholder="Select a Community"
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
                  <Label for="selected-action" className="label-format">Action</Label>
                  <Input type="select" 
                    id="selected-action" 
                    name={`communities[${arrayIndex}].action`}
                    onChange={handleChange}>
                    <option value=""></option>
                    {nextStepsOptns}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {
              (selectedOption && selectedOption.value === 1) ? <Visit /> : null
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
