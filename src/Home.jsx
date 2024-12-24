import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { checkAuthentication } from './auth/checkAuth';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuthentication(setUserinfo, authState, oktaAuth);
    };

    if (authState.isAuthenticated) {
      authenticateUser();
    }
  }, [authState, oktaAuth]);

  // Handle loading state when authState is being checked
  if (authState.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated
    ? <Navigate to='/inquiryForm' />
    : <Navigate to='/redirect' />;
};

export default Home;
