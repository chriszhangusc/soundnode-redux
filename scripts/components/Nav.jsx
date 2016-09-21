import React from 'react';
import NavSearchContainer from '../containers/NavSearchContainer';

function renderSearchField() {
  return (
    <div className="nav-nav float-right">
      <div className="nav-nav-item">
        <NavSearchContainer />
      </div>
    </div>
  );
}

export default function Nav() {
  return (
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
        { renderSearchField() }
      </div>
    </div>
  );
}
