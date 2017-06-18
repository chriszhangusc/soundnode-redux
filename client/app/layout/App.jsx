import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import {
  CHARTS_ROUTE,
  USER_PROFILE_ROUTE,
  TRACK_PROFILE_ROUTE,
  AUTH_CALLBACK_ROUTE,
  FAVORITES_ROUTE,
  STREAM_ROUTE,
} from 'client/common/constants/routeConsts';
import Charts from 'client/features/charts/Charts';
import UserProfile from 'client/features/userProfile/UserProfile';
import TrackProfile from 'client/features/trackProfile/TrackProfile';
import Player from 'client/features/player/Player';
import Favorites from 'client/features/favorites/Favorites';
import Stream from 'client/features/stream/Stream';
import Playlist from 'client/features/playlist/Playlist';
import Nav from 'client/common/components/Nav';
import Sidebar from 'client/common/components/Sidebar';
import Callback from 'client/common/components/Callback';
import GlobalEvents from 'client/features/global/GlobalEvents';
import Loadable from 'react-loading-overlay';
import styled from 'styled-components';
import {
  NAV_BAR_HEIGHT,
  SIDEBAR_WIDTH_DESKTOP,
  SIDEBAR_WIDTH_DESKTOP_LG,
  SIDEBAR_WIDTH_4K,
} from 'client/app/css/variables';

import { media } from 'client/app/css/styleUtils';

import NotificationCenter from 'client/features/notification/NotificationCenter';
import { isLoginInProgress } from 'client/features/auth/authSelectors';
// import OverlayLoader from 'client/features/overlayLoader/OverlayLoader';
import { connect } from 'react-redux';
/* Initialze SC which will be available all over the app */
import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from 'client/common/constants/authConsts';

import 'client/app/css/global';

SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'non-expiring',
});

const PageContentWrapper = styled.div`
  margin-left: $sidebar-width;
  padding: 20px 20px 20px 50px;
  ${media.desktop`margin-left: ${SIDEBAR_WIDTH_DESKTOP}`}
  ${media.desktopLG`margin-left: ${SIDEBAR_WIDTH_DESKTOP_LG}`}
  ${media.desktop4K`margin-left: ${SIDEBAR_WIDTH_4K}`}
  overflow-y: scroll;
  overflow-x: hidden;
  /* Making space for music player */
  padding-bottom: 70px;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  padding-top: 80px;
`;

function Main({ loginInProgress }) {
  return (
    <Loadable active={loginInProgress} spinner text="Authenticating..." animate zIndex={9999}>
      <MainWrapper>
        <Nav />
        <Sidebar />
        <PageContentWrapper>
          <Switch>
            <Route exact path={`${CHARTS_ROUTE}/:genre?`} component={Charts} />
            <Route exact path={`${USER_PROFILE_ROUTE}/:userId`} component={UserProfile} />
            <Route exact path={`${TRACK_PROFILE_ROUTE}/:trackId`} component={TrackProfile} />
            <Route exact path={`${FAVORITES_ROUTE}`} component={Favorites} />
            <Route exact path={`${STREAM_ROUTE}`} component={Stream} />
            <Redirect to={CHARTS_ROUTE} />
          </Switch>
          <Player />
          <Playlist />
        </PageContentWrapper>
        <GlobalEvents />
        <NotificationCenter />
      </MainWrapper>
    </Loadable>
  );
}

function mapStateToProps(state) {
  return {
    loginInProgress: isLoginInProgress(state),
  };
}

const ConnectedMain = connect(mapStateToProps)(Main);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
        <Route component={ConnectedMain} />
      </Switch>
    </Router>
  );
}

export default App;
