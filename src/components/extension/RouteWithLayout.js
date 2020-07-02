import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (<Route {...rest} render={props => {
  return <Layout {...props}>
    <Component {...props} />
  </Layout>
}} />)


RouteWithLayout.propTypes = {
  component: propTypes.elementType.isRequired,
  layout: propTypes.elementType.isRequired
}


export default RouteWithLayout;
