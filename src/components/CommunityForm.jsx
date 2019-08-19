import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import Select from 'react-select';
import Visit from './Visit';

// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
const communityList = [
  {value: '1234', 'label': 'Brookdale Avalone'},
];

const nextStepsOptions = [
  {value: 1, label: 'Visit Scheduled'},
  {value: 2, label: 'Home Visit Scheduled'},
  {value: 3, label: 'Assessment Scheduled'},
  {value: 4, label: 'Lead No Visit & Transfer to Community'},
  {value: 5, label: 'Event RSVP Transfer to Community'},
  {value: 6, label: 'First Call Left VM'},
  {value: 7, label: 'No Contact & Transfer to Community'},
  {value: 8, label: 'PPC No Contact & Transfer to Community'},
  {value: 9, label: 'Follow up Call to Schedule Appointment'},
  {value: 10, label: 'Non Qualified Interaction'},
  {value: 11, label: 'Back Office Entry Fee Lead'},
  {value: 12, label: 'Back Office Project Contellation'},
  {value: 13, label: 'Spanish Lead'},
  {value: 14, label: 'BHS Referral'},
  {value: 15, label: 'Large Employer Group - Non Senior Living Lead'},
  {value: 16, label: 'Professional Referral'},
];

export default class CommunityForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      communityList: [],
      selectedOption: null,
    }

    this.handleNextSteps = this.handleNextSteps.bind(this);
  }

  componentDidMount() {
    console.log('called componentDidMount on community form');
    // removed do to CORS issues
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

  handleNextSteps(option) {
    console.log(`Option selected:`, option);
    this.setState({
      selectedOption: option
    })
  }

  render () {
    const {selectedOption} = this.state;

   return (
     <div class="communities-container">
       <Card>
         <CardBody>
           <Row>
             <Col>
               <Select options={communityList} />
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
                <label for="secondPersonFee">2nd Person Fee</label>
                <input type="text" class="form-control" id="secondPersonFee" placeholder="2nd Person Fee" value={this.props.community.secondPersonFee}/>
              </Col>
              <Col>
                <label for="communityFee">Community Fee</label>
                <input type="text" class="form-control" id="communityFee" placeholder="Community Fee" value={this.props.community.communityFee}/>
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
          <Button color="primary" size="sm">Remove</Button>
        </CardFooter>
      </Card>
    </div>
   )
 }
}
