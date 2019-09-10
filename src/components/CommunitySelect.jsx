import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Visit from './Visit';
import {fetchCommunities} from '../services/CommunityServices'

import Select from 'react-select';

// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
const communityList = [
//  {value: '1', 'label': 'Brookdale Andy'},
//  {value: '2', 'label': 'Brookdale Avalone'},
//  {value: '3', 'label': 'Brookdale Dan'},
//  {value: '4', 'label': 'Brookdale Janet'},
//  {value: '5', 'label': 'Brookdale Jeff'},
//  {value: '6', 'label': 'Brookdale Josh'},
//  {value: '7', 'label': 'Brookdale Mary'},
//  {value: '8', 'label': 'Brookdale Matt'},
];

const nextStepsOptions = [
  {value: 1, label: 'Visit Scheduled'},
  {value: 3, label: 'Assessment Scheduled'},
  {value: 2, label: 'Home Visit Scheduled'},
  {value: 4, label: 'Lead No Visit & Transfer to Community'},
  {value: 5, label: 'Event RSVP Transfer to Community'},
  {value: 7, label: 'No Contact & Transfer to Community'},
];

const nonCommunityNextSteps = [
  {value: 6, label: 'First Call Left VM'},
  {value: 8, label: 'PPC No Contact & Transfer to Community'},
  {value: 9, label: 'Follow up Call to Schedule Appointment'},
  {value: 10, label: 'Non Qualified Interaction'},
  {value: 11, label: 'Back Office Entry Fee Lead'},
  {value: 12, label: 'Back Office Project Contellation'},
  {value: 13, label: 'Spanish Lead'},
  {value: 14, label: 'BHS Referral'},
  {value: 15, label: 'Large Employer Group - Non Senior Living Lead'},
  {value: 16, label: 'Professional Referral'},
]

export default class CommunitySelect extends React.Component {
  state = {
    communityList: [],
    selectedOption: null,
  }

  componentDidMount() {
    console.log('called componentDidMount on community form');
    fetchCommunities()
    .then((data) => {
      //console.log(data);
      var communities = data.map((com) => {
        return { value: com.id, label: com.buildingName }
      });
      //console.log(communities);
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

  handleNextSteps = (option) => {
    console.log(`Option selected:`, option);
    this.setState({
      selectedOption: option
    })
  }

  render () {
    const {communityList, selectedOption} = this.state;
    const {community, handleChange, handleBlur} = this.props;
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
                    name="communityId"
                    onChange={this.props.handleChange}
                    options={this.state.communityList}
                  />
                </FormGroup>
             </Col>
           </Row>
           <Row>
             <Col>
                <FormGroup>
                  <Label for="startingPrice" className="label-format">Starting at Price</Label>
                  <Input type="number" id="startingPrice" placeholder="Starting at Price" value={this.props.community.startingPrice} onChange={handleChange} onBlur={handleBlur}/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="secondPersonFee" className="label-format">2nd Person Fee</Label>
                  <Input type="number" id="secondPersonFee" placeholder="2nd Person Fee" value={this.props.community.secondPersonFee} onChange={handleChange} onBlur={handleBlur}/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="communityFee" className="label-format">Community Fee</Label>
                  <Input type="number" id="communityFee" placeholder="Community Fee" value={this.props.community.communityFee} onChange={handleChange} onBlur={handleBlur}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="5">
                <FormGroup>
                  <Label className="label-format">Next Steps</Label>
                  <Input type="select" onChange={this.handleNextSteps}>
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
