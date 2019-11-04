import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ScrollingLayoutManager from './pages/ScrollingLayoutManager';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Redirect from './Redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Security issuer={process.env.REACT_APP_OKTA_URL}
          clientId={process.env.REACT_APP_OKTA_CLIENTID}
          redirectUri={window.location.origin + '/implicit/callback'}>
          <SecureRoute path='/' exact={true} component={Home} />
          <SecureRoute path='/inquiryForm' exact={true} component={ScrollingLayoutManager} />
          <Route path='/redirect' component={Redirect} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
        <ToastContainer />
      </BrowserRouter>
    );
  }
}

export default App;
