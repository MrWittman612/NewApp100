import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path='/'>
            <h1>hello</h1>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Login />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
