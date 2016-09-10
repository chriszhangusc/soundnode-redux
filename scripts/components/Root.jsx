import React from 'react';
import { Provider } from 'react-redux';
import configureRoutes from '../router/index';

const Root = ({ store }) => (
  <Provider store={store}>
    {configureRoutes(store)}
  </Provider>
);

export default Root;
