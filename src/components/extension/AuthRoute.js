import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../../utils/auth';
import RouteWithLayout from './RouteWithLayout';

const AuthRoute = (props) => {
  if (checkAuth()) {
    return props.layout ? <RouteWithLayout {...props} /> : <Route {...props} />
  }

  return <Redirect to='/login' />
}

export default AuthRoute;
