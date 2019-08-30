import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../modules/Auth';

class PrivateRoute extends PureComponent {
  render() {
    const { isLoggedIn, component, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
  renderRoute = props => {
    const { isLoggedIn, component: Component } = this.props;
    return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
  }
}

export default connect(state => ({
  isLoggedIn: getIsLoggedIn(state)
}))(PrivateRoute);
