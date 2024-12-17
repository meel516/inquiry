/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { RequiredAuth } from './SecureRoute';
import ScrollingLayoutManager from '../pages/ScrollingLayoutManager';
import Home from '../Home';
import Redirect from '../Redirect';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' exact={true} element={<RequiredAuth/>}>
            <Route path="" element={<Home/>} />
        </Route>
        <Route path='/inquiryForm' exact={true} element={<RequiredAuth/>}>
            <Route path="" element={<ScrollingLayoutManager/>} />
        </Route>
        <Route path='/redirect' element={<Redirect/>} />
        <Route path='/implicit/callback' element={<LoginCallback/>} />
    </Routes>
  );
};

export default AppRoutes;