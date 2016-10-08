import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import Player from 'client/components/Player';
import Nav from 'client/components/Nav';
import Sidebar from 'client/components/Sidebar';
import Playlist from 'client/components/Playlist';

// Main layout component of our app.

// Change to pure function later.
class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 sidebar">
              <Sidebar />
            </div>
            <div className="col-sm-8 col-sm-offset-2">
              { this.props.children }
            </div>
            <Player />
            <Playlist />
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}
// <Playlist />

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
