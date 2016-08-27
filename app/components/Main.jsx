import React, {Component} from 'react';
import Nav from 'Nav';
import Playlist from 'Playlist';

class Main extends Component {
  render () {
    return (
      <div>
        <Nav />
        <Playlist />
      </div>
    );
  }
}

export default Main;
