import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './auth/checkAuth';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  state = { authenticated: null }
  checkAuthentication = checkAuthentication.bind(this);

  componentDidMount() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    return this.state.authenticated
      ? <Redirect to='/inquiryForm' />
      : <Redirect to='/redirect' />;
  }
}

export default withAuth(Home);
