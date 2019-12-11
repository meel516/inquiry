import React from 'react';

import { Label } from 'reactstrap';
import Select from 'react-select';

import { getDecisionTimeframe } from '../services/dropdowns';

export default class TimeFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: [],
    }
  }

  componentDidMount() {
    getDecisionTimeframe()
      .then((data) => {
        data.map(function (tf) {
          tf.label = tf.text;
        })
        this.setState({ timeframe: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const { timeframe } = this.state || []
    return (
      <>
        <Label for="timeframe" className="label-format">Timeframe</Label>
        <Select
          options={timeframe}
          id="timeframe"
        />
      </>
    )
  }
}
