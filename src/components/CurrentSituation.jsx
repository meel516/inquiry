import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

// <CurrentSituation status={this.state.currentSituation} onChange={this.handleCurrentSituationChange}/>
import {getCurrentSituation} from '../services/SalesServices'

export default class CurrentSituation extends React.Component {
  state = {
    currentSituation: [],
  }

  componentDidMount() {
    getCurrentSituation()
      .then((data) => this.setState({ currentSituation: data }))
      .catch(error => console.log(error));
  }


  render() {
    const {currentSituation} = this.state||[];
    const currentSituationOptions = currentSituation.map((type) => {
      return  <option key={type.value} value={type.value}>{type.text}</option>
    });

    return (
      <FormGroup md="9">
        <Label for="currentSituation" className="label-format">Current Living Situation</Label>
        <Input type="select" id="currentSituation" name="currentSituation">
          <option value="">Select One</option>
          {currentSituationOptions}
        </Input>
      </FormGroup>
    )
  }
}
