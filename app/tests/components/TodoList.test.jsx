const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const $ = require('jQuery');

const TodoList = require('TodoList');
const TodoItem = require('TodoItem');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one TodoItem component for each todo item', () => {
    let todos = [{
      id: 1,
      text: 'Do Something'
    }, {
      id: 2,
      text: 'Do Nothing'
    }];
    let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
    let todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, TodoItem);
    expect(todosComponents.length).toBe(todos.length);
  });
});
