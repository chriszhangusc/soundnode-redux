import { searchTextReducer, showCompletedReducer, todosReducer } from 'reducers';
import * as redux from 'redux';
import thunk from 'redux-thunk';

export const configure = () => {
  const rootReducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
  });

  let store = redux.createStore(rootReducer, redux.compose(
    redux.applyMiddleware(thunk),// making API requests from actions
    window.devToolsExtension && window.devToolsExtension()
  ));

  return store;
};
