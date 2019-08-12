import React, { Component } from 'react';
import Select from 'react-select';

// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
const communityList = [
  {value: '1234', 'label': 'Brookdale Avalone'},
];

export default class CommunityForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeCommunity = this.removeCommunity.bind(this);
  }

  componentDidMount() {
    console.log('called componentDidMount on community form');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('called componentDidUpdate on community form');
  }

  componentWillUnmount() {
    console.log('called componentWillUnmount on community form');
  }

  handleSubmit(event) {
    console.log('handling form submit')
    event.preventDefault();
  }

  removeCommunity(event) {
    // todo:
  }

  render () {
   return (
     <div class="communities-container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <Select options={communityList} />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="startingPrice">Starting at Price*</label>
              <input type="text" class="form-control" id="startingPrice" placeholder="Starting at Price" value={this.props.community.startingPrice}/>
            </div>
            <div class="col">
              <label for="secondPersonFee">2nd Person Fee</label>
              <input type="text" class="form-control" id="secondPersonFee" placeholder="2nd Person Fee" value={this.props.community.secondPersonFee}/>
            </div>
            <div class="col">
              <label for="communityFee">Community Fee</label>
              <input type="text" class="form-control" id="communityFee" placeholder="Community Fee" value={this.props.community.communityFee}/>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <button id="removeCommunity" class="btn btn-primary btn-sm">Remove</button>
        </div>
      </div>
     </div>
   )
 }
}
