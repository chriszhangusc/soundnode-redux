import React from 'react';
import { Provider } from 'react-redux';
import configureRoutes from '../router/index';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      {configureRoutes(store)}
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.shape({})
};
