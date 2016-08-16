const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const $ = require('jQuery');

const { TodoItem } = require('TodoItem');

describe('TodoItem', () => {
  it('should exist', () => {
    expect(TodoItem).toExist();
  });
});
