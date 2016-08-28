import * as redux from 'redux';
import thunk from 'redux-thunk';

export const configure = () => {
  const rootReducer = redux.combineReducers({
    state: (state = {}) => { return state; }
  });

  let store = redux.createStore(rootReducer, redux.compose(
    redux.applyMiddleware(thunk),// making async API requests from actions?
    window.devToolsExtension && window.devToolsExtension()
  ));

  return store;
};
