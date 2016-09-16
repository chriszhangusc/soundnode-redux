import React from 'react';
import { Provider } from 'react-redux';
import configureRoutes from '../router/index';

const Root = ({ store }) => (
  <Provider store={store}>
    {configureRoutes(store)}
  </Provider>
);

Root.propTypes = {
  store: React.PropTypes.object
};

export default Root;
