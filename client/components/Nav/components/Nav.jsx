import React from 'react';
import NavSearchContainer from '../containers/NavSearchContainer';
// import NavUserContainer from '../containers/NavUserContainer';
import NavHeader from './NavHeader';

/* This is our main Nav layout */
function Nav() {
  return (
    <nav className="navbar navbar-fixed-top">
      <div className="nav-wrapper">
        <NavHeader />
        <div className="nav-search-user-wrapper">
          <NavSearchContainer />
          {/*<NavUserContainer />*/}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
