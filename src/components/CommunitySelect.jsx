import React from 'react';
import {Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Visit from './Visit';
import {fetchCommunities} from '../services/CommunityServices'
import {getFollowupActions} from '../services/SalesServices'

import Select from 'react-select';

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

  handleRemoveCommunity = () => {
    this.props.onRemove();
  }

  handleFollowupAction = (optn) => {
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].followUpAction`, optn.target.value);
    this.setState({selectedAction: optn.target.value})
  }

  handleCommunityChange = (optn) => {
    const {index, setFieldValue} = this.props;
    setFieldValue(`communities[${index}].communityId`, optn.value);
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
                    name={`communities[${index}].startingPrice`} 
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
                    name={`communities[${index}].secondPersonFee`}
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
                    name={`communities[${index}].communityFee`}
                    value={community.communityFee|0} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Community Fee" />
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

CommunitySelect.propTypes = {
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
}
