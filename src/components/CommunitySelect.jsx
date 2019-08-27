import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Visit from './Visit';
import {fetchCommunities} from '../services/CommunityServices'

import Select from 'react-select';

// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
const communityList = [
  {value: '1234', 'label': 'Brookdale Avalone'},
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
  constructor(props) {
    super(props);

    this.state = {
      communityList: [],
      selectedOption: null,
    }

    this.handleNextSteps = this.handleNextSteps.bind(this);
    this.handleRemoveCommunity = this.handleRemoveCommunity.bind(this);
  }

  componentDidMount() {
    console.log('called componentDidMount on community form');
    // removed do to CORS issues
    fetchCommunities()
    .then((data) => {
      var communities = data.filter((com) => com.active)
            .map((com) => {com.value = com.bu});
      this.setState({communityList: communities});
    })
    .catch((err) => console.error("Error", err));
    /*fetch('https://unit-api.brookdale.com/bu-master/api/communities', {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => {
        var communities = data
          .filter(com => com.active)
          .map(com => {com.value = com.bu;
                       com.label = com.name})
        this.setState({ communityList: communities })
      })
      .catch(error => console.log(error));*/
  }

  componentWillUnmount() {
    console.log('called componentWillUnmount on community form');
  }

  handleRemoveCommunity() {
    this.props.onRemove();
  }

  handleNextSteps(option) {
    console.log(`Option selected:`, option);
    this.setState({
      selectedOption: option
    })
  }

  render () {
    const {selectedOption} = this.state;

   return (
     <div className="communities-container">
       <Card>
         <CardBody>
           <Row>
             <Col>
               <Select
                 options={communityList}
                />
             </Col>
           </Row>
           <Row>
             <Col>
                <FormGroup>
                  <Label for="startingPrice">Starting at Price*</Label>
                  <Input type="text" id="startingPrice" placeholder="Starting at Price" value={this.props.community.startingPrice}/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="secondPersonFee">2nd Person Fee</Label>
                  <Input type="text" id="secondPersonFee" placeholder="2nd Person Fee" value={this.props.community.secondPersonFee}/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="communityFee">Community Fee</Label>
                  <Input type="text" id="communityFee" placeholder="Community Fee" value={this.props.community.communityFee}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Next Steps</Label>
                  <Select
                    options={nextStepsOptions}
                    onChange={this.handleNextSteps}
                  />
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
