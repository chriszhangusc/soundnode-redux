const $ = require('jquery');
module.exports = {
  // Get called when we update todos
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  // Return all todos
  getTodos: function () {
    let stringTodos = localStorage.getItem('todos');
    let todos = [];

    try {
      todos = JSON.parse(stringTodos);
    } catch (e) {
      console.log(e);
    }
    // We dont actually need this check?
    if ($.isArray(todos)) {
      return todos;
    } else {
      console.log('This should not run');
      return [];
    }
  },

  // Take a set of array filter it and return a subset of it.
  filterTodos: function (todos, showCompleted, searchText) {

    let filtered = todos.filter(function (todo) {
      let match = todo.text.toLowerCase().includes(searchText);

      return showCompleted ? match : match && !todo.completed;
    });

    // Sort todos so that completed items will always show up after incompleted one.
    filtered.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filtered;
  }
}
