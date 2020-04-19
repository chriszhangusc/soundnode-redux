import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@soundnode-redux/client/src/app/sagas/rootSaga';
// import logger from 'redux-logger';
// import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    ),
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      // eslint-disable-next-line
      const nextReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
