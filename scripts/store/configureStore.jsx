import * as redux from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const configure = () => {

  let store = redux.createStore(rootReducer, redux.compose(
    redux.applyMiddleware(thunk),// making async API requests from actions?
    window.devToolsExtension && window.devToolsExtension()
  ));

  return store;
};
