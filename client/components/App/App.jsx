import React, { Component, PropTypes } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ChartsPage from 'client/routes/charts';

import { NotificationContainer } from 'react-notifications';
import Player from 'client/components/Player';
import Nav from 'client/components/Nav';
import Sidebar from 'client/components/Sidebar';
import Playlist from 'client/components/Playlist';
import { notificationFailure, notificationSuccess } from 'client/redux/modules/notification';
import { connect } from 'react-redux';

// Main container of our app.
class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    window.addEventListener('offline', () => {
      dispatch(notificationFailure('Looks like your internet connection is down!'));
    });

    window.addEventListener('online', () => {
      dispatch(notificationSuccess('Great, you are back online!'));
    });

    const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
    dispatch(fetchUser('MiniPekka'));
  }

  componentWillUnmount() {
    // Remove global listeners
    window.removeEventListener('offline');
    window.removeEventListener('online');
  }

  // <Sidebar />
  render() {
    return (
      <Router>
        <div id="main-wrapper">
          <Nav />
          <Sidebar />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <Switch>
                    <Route exact path="/charts/:genre?" component={ChartsPage} />
                    <Redirect to="/charts" />
                  </Switch>
                </div>
                <Player />
                {/*<Playlist />*/}
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
