import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { checkAuthentication } from './auth/checkAuth';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const state = { authenticated: null };
  console.log('Home - Before checkAuth');
  async () => checkAuthentication.bind(this, authState, oktaAuth);
  console.log('Home - After checkAuth');

  const componentDidMount = async () => {
    this.checkAuthentication();
  }

  return authState.isAuthenticated
      ? <Navigate to='/inquiryForm' />
      : <Navigate to='/redirect' />;
}

export default Home;
