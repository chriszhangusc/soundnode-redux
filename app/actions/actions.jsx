import firebase, {firebaseRef} from 'app/firebase/index';
import moment from 'moment';


// All action generators go here.
export const setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText,
  };
};


export const addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos,
  };
};

export const startAddTodos = () => {
  return (dispatch, getState) => {
    // 1. Send fetch all records async request to firebase
    // 2. If success, dispatch addTodos action
    let todos = [];
    const todosRef = firebaseRef.child('todos');
    todosRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let todo = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        };
        todos.push(todo);
      });
      console.log('todos', todos);
    }).then(() => {
      // Update redux store which will rerender our display
      dispatch(addTodos(todos));
    });
  }
};


export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo,
  };
};

export const startAddTodo = (text) => {
  return (dispatch, getState) => {
    const todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null,
    };

    const todoRef = firebaseRef.child('todos').push(todo);
    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};

export const toggleShowComplated = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  };
};

export const updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates,
  };
};

// Async call thanks to thunk
export const startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    const todoRef = firebaseRef.child(`todos/${id}`);
    const updates = {
      completed,
      completedAt: completed ? moment().unix() : null,
    };

    todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};
