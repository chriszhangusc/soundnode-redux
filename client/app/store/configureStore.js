import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'app/sagas/rootSaga';
// import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { rootReducer } from '../reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk,
        sagaMiddleware,
        // logger,
      ),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
  persistStore(store, {
    whitelist: [],
    debounce: 2000,
  });
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
