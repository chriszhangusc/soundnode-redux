import React from 'react';
import NavSearchContainer from '../containers/NavSearchContainer';
import NavUserContainer from '../containers/NavUserContainer';
/* This is our main Nav layout */
const Nav = () => (
  <nav className="navbar navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="http://localhost:3000">
          <span className="glyphicon glyphicon-headphones" id="nav-icon" /><span>Redux Music</span>
        </a>
      </div>
      <div className="nav table-display pull-right">
        <NavSearchContainer />
        <NavUserContainer />
      </div>
    </div>
  </nav>
);

export default Nav;
