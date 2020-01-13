import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage'
import ProtectedRoute from './Auth/ProtectedRoute';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path='/super-secret-squid-login' render={() => token ? <Redirect to='/squid-home' /> : <Login />} />
        <Route exact path='/' component={LandingPage} />
        <Route path='/bands' component={Bands} />
        <ProtectedRoute path='/squid-home' component={SquidHome}></ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
