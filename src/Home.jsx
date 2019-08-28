import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './Helpers';
import { Redirect } from 'react-router-dom';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
      return (
        <div>
          {this.state.authenticated !== null &&
          <div>
            {this.state.authenticated &&
              <div>
                <Redirect to='/inquiryForm' />
              </div>
            }
            {!this.state.authenticated &&
              <div>
                <p>
                  When you click the login button below, you will be redirected to the login page on your Okta org to authenticate.
                </p>
                <button id="login-button" primary onClick={this.login}>Login</button>
              </div>
            }
          </div>
          }
        </div>
      );
    }
});
