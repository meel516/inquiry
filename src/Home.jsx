import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './auth/checkAuth';
import { Redirect } from 'react-router-dom';

export default withAuth(class Home extends Component {
  state = { 
    authenticated: null, 
    userinfo: null 
  }
  checkAuthentication = checkAuthentication.bind(this);

  componentDidMount() {
    this.checkAuthentication();
  }

  login = () => {
    this.props.auth.login('/');
  }

  render() {
    if (this.state.authenticated === null) return null;
    
    const homeContent = this.state.authenticated ? (
      <div>
        <Redirect to='/inquiryForm' />
      </div>
    ) : (
      <div>
        <Redirect to='/redirect' />
      </div>
    );
    
    return (
      <div>
        {homeContent}
      </div>
    );
  }
});
