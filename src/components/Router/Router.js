import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header';
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
      <Header />
      <Switch>
        <PrivateRoute path="/map" component={map} />
        <PrivateRoute path="/profile" component={profile} />
        <Route path="/login" component={login} />
        <Redirect from="*" to="/map" />
      </Switch>
    </BrowserRouter>
  )
}
