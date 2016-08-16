// All action generators go here.
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText,
  };
};


export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos, 
  }
};

export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  }
};

export var toggleShowComplated = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  };
};

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};
