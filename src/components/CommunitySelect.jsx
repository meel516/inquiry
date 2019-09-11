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
      //console.log(data);
      var communities = data.map((com) => {
        return { value: com.id, label: com.buildingName }
      });
      //console.log(communities);
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

  handleNextSteps = (option) => {
    console.log(`Option selected:`, option);
    this.setState({
      selectedAction: option
    })
    this.props.handleChange('')
  }

  render () {
    const {communityList, selectedAction, followupActions} = this.state;
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
