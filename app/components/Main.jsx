const React = require('react');
const Nav = require('Nav');
const Main = (props) => {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  );
};

module.exports = Main;
