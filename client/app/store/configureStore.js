import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';
// import { loadState, saveState } from 'client/common/utils/LocalStorageUtils';
import rootSaga from 'client/app/sagas/rootSaga';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { rootReducer, rootEpic } from '../reducers/rootReducer';

// const epicMiddleware = createEpicMiddleware(rootEpic);
const sagaMiddleware = createSagaMiddleware();


function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk,
        // epicMiddleware,
        sagaMiddleware,
        logger,
      ),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
  persistStore(store, {
    debounce: 1000,
  });
  sagaMiddleware.run(rootSaga);

  // Every time the store changes, save our state to localStorage
  // throttle it because it contains expensive stringify function.
  // Make sure it does not get called more often than once a second.
  // store.subscribe(throttle(() => {
  //   saveState(store.getState(), ['user']);
  // }, 1000));

  return store;
}

export default configureStore;
