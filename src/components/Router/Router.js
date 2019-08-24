import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Map from '../Map';
import Profile from '../Profile';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import './Router.module.css';

export default () => {
  const map = props => <Map {...props} />;
  const profile = props => <Profile {...props} />;
  const login = props => <Login {...props} />;

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/map" component={map} />
        <PrivateRoute path="/profile" component={profile} />
        <Route path="/login" exact component={login} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  )
}
