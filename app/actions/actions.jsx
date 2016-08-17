import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';
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
    var uid = getState().auth.uid;
    const todosRef = firebaseRef.child(`users/${uid}/todos`);
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
    var uid = getState().auth.uid;
    const todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null,
    };

    const todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);
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
  var uid = getState().auth.uid;
  return (dispatch, getState) => {
    const todoRef = firebaseRef.child(`users/uid/todos/${id}`);
    const updates = {
      completed,
      completedAt: completed ? moment().unix() : null,
    };

    todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    }, () => {
      console.log('Logout failed');
    });
  };
};
