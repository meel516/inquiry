/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * Helper function that watches the authenticate state, then applies it
 * as a boolean (authenticated) as well as attaches the userinfo data.
 */
async function checkAuthentication(callback, authState, oktaAuth) {
  console.log('Did I get here');

  // Check if the user is authenticated
  const authenticated = authState.isAuthenticated;
  console.log('authenticated:', authenticated);

  if (authenticated) {
    // If authenticated and user info is not available, fetch it
    if (!authState.userinfo) {
      const userinfo = await oktaAuth.getUser();
      console.log('userinfo:', userinfo);
      
      // If a callback is passed, call it with the userinfo
      if (callback) callback(userinfo);
    } else {
      console.log('checkAuth: Already authenticated');
    }
  }
}

export { checkAuthentication };