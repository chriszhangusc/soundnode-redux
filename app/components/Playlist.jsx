import React, {Component} from 'react';
import Toolbar from 'Toolbar';
import SongCards from 'SongCards';

class Playlist extends Component {
  render () {
    return (
      <div className="songs">
        <Toolbar />
        <div className="container">
          <SongCards />
        </div>
      </div>
    );
  }
}

export default Playlist;
