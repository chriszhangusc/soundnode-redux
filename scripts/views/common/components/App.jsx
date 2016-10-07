import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import Nav from './Nav';
import Sidebar from './Sidebar';
import PlaylistContainer from '../containers/PlaylistContainer';
import PlayerContainer from '../../player/containers/PlayerContainer';
// Skeleton layout of our app
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
            <PlayerContainer />
            <PlaylistContainer />
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
