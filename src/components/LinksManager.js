import React, { Component } from 'react';

class LinksManager extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('LinksManager componentDidMount()')
  }

  render() {
    return (
      <div class="row">
        <div class="col">
          <div class="list-group list-group-flush">
            <div class="list-group-item">
              <label>System Links</label>
            </div>
            <div class="list-group-item">
              <a href="http://sales.assisted.com">SMS</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LinksManager;
