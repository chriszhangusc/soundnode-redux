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
    <nav className="navbar navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="http://localhost:3000">
            <span className="glyphicon glyphicon-headphones" id="nav-icon" /><span>ReduxSound</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// <div className="nav">
//   <div className="container clearfix">
//     <div className="nav-logo">
//       <i className="icon ion-radio-waves" />
//     </div>
//     <div className="nav-nav float-left">
//       <div className="nav-nav-item">
//         <a className="nav-nav-item-link active" href="/">SoundRedux</a>
//       </div>
//     </div>
//     { renderSearchField() }
//   </div>
// </div>
