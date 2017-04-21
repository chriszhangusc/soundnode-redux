import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  CHARTS_ROUTE,
  USER_PROFILE_ROUTE,
  TRACK_PROFILE_ROUTE,
  AUTH_CALLBACK_ROUTE,
} from 'client/constants/RouteConsts';
import ChartsPage from 'client/containers/routes/Charts';
import UserProfilePage from 'client/containers/routes/UserProfile';
import { NotificationContainer } from 'react-notifications';
import Player from 'client/containers/common/Player';
import Nav from 'client/containers/common/Nav';
import Sidebar from 'client/containers/common/Sidebar';
import Playlist from 'client/containers/common/Playlist';
import Callback from 'client/containers/common/Callback';
import { notificationFailure, notificationSuccess } from 'client/redux/modules/notification';
import { connect } from 'react-redux';

import styled, { injectGlobal } from 'styled-components';
import { BACKGROUND_COLOR, LIGHTER_GRAY } from 'client/css/colors';
import { NAV_BAR_HEIGHT } from 'client/css/variables';
// eslint-disable-next-line no-unused-expressions

// Global CSS
injectGlobal`

  * {
    padding: 0;
    margin: 0;
  }

  html {
    font-family: 'Open Sans';
    /* Always put font-size here so that we could apply rem */
    font-size: 14px;
  }

  body {
    color: white;
    background-color: ${BACKGROUND_COLOR};
    padding-top: ${NAV_BAR_HEIGHT}px;
  }

  a {
    color: ${LIGHTER_GRAY}
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: ${LIGHTER_GRAY};
      cursor: pointer;
      text-decoration: none;
    }
  }

  .container {
    padding: 0;
  }

  .content {
    margin: 40px 0 80px;
  }

  ul {
    list-style-type: none;
  }

  .pad-bottom {
    padding-bottom: 70px;
  }

  .container-fluid {
      padding: 0;
  }
`;

const MainWrapper = styled.div`
`;

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

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Sidebar />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <Switch>
                    <Route exact path={`${CHARTS_ROUTE}/:genre?`} component={ChartsPage} />
                    <Route
                      exact
                      path={`${USER_PROFILE_ROUTE}/:userId`}
                      component={UserProfilePage}
                    />
                    <Route exact path={`${TRACK_PROFILE_ROUTE}/:trackId`} />
                    <Route path={AUTH_CALLBACK_ROUTE} component={Callback} />
                    <Redirect to={CHARTS_ROUTE} />
                  </Switch>
                </div>
                <Player />
                <Playlist />
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
