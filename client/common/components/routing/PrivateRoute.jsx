import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from 'client/features/auth/authUtils';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        (isAuthenticated() ? <Component {...props} /> : <Redirect to="/require_auth" />)}
    />
  );
}

export default PrivateRoute;
