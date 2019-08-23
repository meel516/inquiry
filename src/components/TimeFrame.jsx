import React from 'react';

import {Label} from 'reactstrap';
import Select from 'react-select';

const URL_TIMEFRAME = `${process.env.REACT_APP_SALES_SERVICES_URL}/api/dropdowns/decisionTimeframe`;

export default class TimeFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: [],
    }
  }

  componentDidMount() {
    console.log('VeteranStatus.componentDidMount()')
    fetch(URL_TIMEFRAME, {mode: 'cors', cache: 'no-cache'})
      .then((res) => res.json())
      .then((data) => {
        data.map(function(tf) {
          tf.label = tf.text;
        })
        this.setState({ timeframe: data })
      })
      .catch(error => console.log(error));
  }

  render() {
    const {timeframe} = this.state || []
    return (
      <>
      <Label for="timeframe">Timeframe</Label>
      <Select
        options={timeframe}
        id="timeframe"
      />
      </>
    )
  }
}
