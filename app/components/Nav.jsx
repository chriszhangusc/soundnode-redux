const React = require('react');
const { Link, IndexLink } = require('react-router');

const Nav = (props) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">React Todo App</li>
          <li><IndexLink to="/" activeClassName="active-link">Todo</IndexLink></li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li className="menu-text">Created by <a href="#/" target="_blank">Huachao Zhang</a></li>
        </ul>
      </div>
    </div>
  );
}

module.exports = Nav;
