import React, {Component} from 'react';
import Toolbar from 'Toolbar';
import SongCards from 'SongCards';

class Playlist extends Component {
  constructor(props) {
      super(props);
  }

  render () {
    console.log(this.props.params.genre);
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
