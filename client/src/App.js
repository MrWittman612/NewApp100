import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <h1>hello</h1>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
