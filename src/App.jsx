import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import ScrollingLayoutManager from './pages/ScrollingLayoutManager';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import Home from './Home';

const config = {
  issuer: `${process.env.REACT_APP_OKTA_URL}/oauth2/default`,
  client_id: `${process.env.REACT_APP_OKTA_CLIENTID}`,
  redirect_uri: `${window.location.origin}/implicit/callback`,
}

function App() {
  return (
    <BrowserRouter>
        <Security {...config}>
          <SecureRoute path='/' exact component={Home} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          <SecureRoute exact path="/inquiryForm" component={ScrollingLayoutManager} />
        </Security>
    </BrowserRouter>
  );
}

export default App;
