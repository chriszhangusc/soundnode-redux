var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
  it('Should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text',
    };
    var res = actions.setSearchText(action.searchText);

    expect(action).toEqual(res);
  });

  it('Should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Running',
    };
    var res = actions.addTodo('Running');

    expect(action).toEqual(res);
  });

  it('Should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
    };

    var res = actions.toggleShowComplated();
    expect(action).toEqual(res);
  });

  it('Should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 2,
    };

    var res = actions.toggleTodo(2);
    expect(action).toEqual(res);
  });
});
