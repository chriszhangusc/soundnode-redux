const React = require('react');
const { Link, IndexLink } = require('react-router');

const Nav = (props) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">React Time App</li>
          <li><IndexLink to="/" activeClassName="active-link">Timer</IndexLink></li>
          <li><IndexLink to="/countdown" activeClassName="active-link">Countdown</IndexLink></li>
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
