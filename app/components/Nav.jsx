import React, {Component} from 'react';
import { Link } from 'react-router';
class Nav extends Component{
  render () {
    return (
      <div className="nav">
        <div className="container">
          <div className="nav-nav">
            <div className="nav-logo">
              <i className="icon ion-radio-waves" />
            </div>
            <div className="nav-nav-item">
                <a className="nav-nav-item-link active" href="/">SoundRedux</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
