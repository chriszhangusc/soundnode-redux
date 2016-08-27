import React, {Component} from 'react';
import Toolbar from 'Toolbar';
import Spinner from 'Spinner';

class Songs extends Component {
  render () {
    return (
      <div className="songs">
        <Toolbar />
        <div className="container">
          <div className="content">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
}

export default Songs;
