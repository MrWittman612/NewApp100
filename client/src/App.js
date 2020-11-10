import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/index';

import { PrivateRoute } from './hoc/PrivateRoute';
import LandingPage from './pages/landingpage';
import { checkAuth } from './utils/auth';
checkAuth();
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <PrivateRoute path='/dashboard'>
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
