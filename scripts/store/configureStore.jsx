import * as redux from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState, saveState } from '../utils/LocalStorageUtils';
// Only load one file so that we don't have to load the whole lodash library
import throttle from 'lodash/throttle';

const configureStore = () => {
  /* Maybe load some configurations? */
  const persistedState = loadState();

  const store = redux.createStore(
    rootReducer,
    persistedState,
    redux.compose(
      redux.applyMiddleware(thunk),// making async API requests from actions?
      window.devToolsExtension && window.devToolsExtension()
    )
  );

  // Every time the store changes, save our state to localStorage
  // throttle it because it contains expensive stringify function.
  // Make sure it does not get called more often than once a second.
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};


export default configureStore;
