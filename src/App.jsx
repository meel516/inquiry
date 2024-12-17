import React from 'react';

import { useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import Routes from './components/Routes';
import './App.css';

const authConfig = {
  issuer: process.env.REACT_APP_OKTA_URL,
  clientId: process.env.REACT_APP_OKTA_CLIENTID,
  redirectUri: window.location.origin + '/implicit/callback',
  pkce: true
};

const oktaAuth = new OktaAuth(authConfig);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth,  originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes />
    </Security>
  );
};

export default App;
