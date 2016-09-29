import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers';
// Only load one file so that we don't have to load the whole lodash library
import rootSaga from '../sagas';
import { loadState, saveState } from '../utils/LocalStorageUtils';

const configureStore = () => {
  const persistedState = loadState();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    persistedState,
    // initialState,
    compose(
      applyMiddleware(thunk, sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  sagaMiddleware.run(rootSaga);
  // if (process.env.NODE_ENV !== 'production') {
  //   store.dispatch = addLoggingToDispatch(store);
  // }

  // Every time the store changes, save our state to localStorage
  // throttle it because it contains expensive stringify function.
  // Make sure it does not get called more often than once a second.
  store.subscribe(throttle(() => {
    saveState(store.getState(), ['playlists', 'player', 'auth']);
  }, 1000));

  return store;
};


export default configureStore;
