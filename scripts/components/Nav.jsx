import React, {Component} from 'react';
import NavSearch from './NavSearch';

const Nav = () => (

  <div className="nav">
    <div className="container clearfix">
      <div className="nav-logo">
        <i className="icon ion-radio-waves" />
      </div>
      <div className="nav-nav float-left">
        <div className="nav-nav-item">
            <a className="nav-nav-item-link active" href="/">SoundRedux</a>
        </div>
      </div>

      <div className="nav-nav float-right">
        <div className="nav-nav-item">
          <NavSearch />
        </div>
      </div>
    </div>
  </div>

)

export default Nav;
