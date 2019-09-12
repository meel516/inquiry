import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './Helpers';
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
                <Redirect to='http://google.com' />
              </div>
            }
          </div>
        }
      </div>
    );
  }
});
