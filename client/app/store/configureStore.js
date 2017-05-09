import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';
// Only load one file so that we don't have to load the whole lodash library
// import throttle from 'lodash/throttle';
// import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';
// import { loadState, saveState } from 'client/common/utils/LocalStorageUtils';
import rootSaga from 'client/app/sagas/rootSaga';
import notificationMiddleware from '../middlewares/notificationMiddleware';
import apiMiddleware from '../middlewares/apiMiddleware';
import { rootReducer, rootEpic } from '../reducers/rootReducer';

const epicMiddleware = createEpicMiddleware(rootEpic);
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  // const persistedState = loadState();
  // const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk,
        // epicMiddleware,
        sagaMiddleware,
        apiMiddleware,
        notificationMiddleware,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
  );
  sagaMiddleware.run(rootSaga);

  // Every time the store changes, save our state to localStorage
  // throttle it because it contains expensive stringify function.
  // Make sure it does not get called more often than once a second.
  // store.subscribe(throttle(() => {
  //   saveState(store.getState(), ['user']);
  // }, 1000));

  return store;
};


export default configureStore;
