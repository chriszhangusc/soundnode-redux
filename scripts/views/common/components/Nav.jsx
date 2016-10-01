import React from 'react';
import NavSearchContainer from '../containers/NavSearchContainer';


export default function Nav() {
  return (
    <nav className="navbar navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="http://localhost:3000">
            <span className="glyphicon glyphicon-headphones" id="nav-icon" /><span>ReduxSound</span>
          </a>
        </div>
        <NavSearchContainer />
      </div>
    </nav>
  );
}
