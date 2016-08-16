const redux = require('redux');
const { searchTextReducer, showCompletedReducer, todosReducer } = require('reducers');

export var configure = () => {
  const rootReducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
  });

  let store = redux.createStore(rootReducer, redux.compose(
    window.devToolsExtension && window.devToolsExtension()
  ));

  return store;
};
