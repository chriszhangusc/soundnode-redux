import React from 'react';
import SC from 'soundcloud';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DEFAULT_GENRE } from 'features/charts/chartsConsts';
import * as routes from 'common/constants/routeConsts';
import Charts from 'features/charts/Charts';
import UserProfile from 'features/userProfile/UserProfile';
import TrackProfile from 'features/trackProfile/TrackProfile';
import Player from 'features/player/Player';
import Favorites from 'features/favorites/Favorites';
import Stream from 'features/stream/Stream';
import Playlist from 'features/playlist/Playlist';
import Nav from 'common/components/Nav';
import Sidebar from 'common/components/Sidebar';
import Callback from 'common/components/Callback';
import GlobalEvents from 'features/global/GlobalEvents';
import Loadable from 'react-loading-overlay';
import styled from 'styled-components';
import {
  // NAV_BAR_HEIGHT,
  SIDEBAR_WIDTH_DESKTOP,
  SIDEBAR_WIDTH_DESKTOP_LG,
  SIDEBAR_WIDTH_4K,
} from 'app/css/variables';

import { media } from 'app/css/styleUtils';

import NotificationCenter from 'features/notification/NotificationCenter';
import { isLoginInProgress } from 'features/auth/authSelectors';
import { connect } from 'react-redux';
import { CLIENT_ID, REDIRECT_URI } from 'common/constants/authConsts';
import 'app/css/global';

import { validateGenre } from 'features/charts/chartsUtils';

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
  const defaultRedirect = <Redirect to={`${routes.CHARTS_ROUTE}/${DEFAULT_GENRE}`} />;

  return (
    <Loadable active={loginInProgress} spinner text="Authenticating..." animate zIndex={9999}>
      <MainWrapper>
        <Nav />
        <Sidebar />
        <PageContentWrapper>
          <Switch>
            <Route
              exact
              path={`${routes.CHARTS_ROUTE}/:genre?`}
              render={(routeProps) => {
                // Validate route on route change
                const { match } = routeProps;
                const genreFromUrl = match.params.genre;
                const valid = validateGenre(genreFromUrl);
                return valid ? <Charts {...routeProps} /> : defaultRedirect;
              }}
            />
            <Route exact path={`${routes.USER_PROFILE_ROUTE}/:userId`} component={UserProfile} />
            <Route exact path={`${routes.TRACK_PROFILE_ROUTE}/:trackId`} component={TrackProfile} />
            <Route exact path={`${routes.FAVORITES_ROUTE}`} component={Favorites} />
            <Route exact path={`${routes.STREAM_ROUTE}`} component={Stream} />
            {defaultRedirect}
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

Main.propTypes = {
  loginInProgress: PropTypes.bool.isRequired,
};

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
        <Route exact path={routes.AUTH_CALLBACK_ROUTE} component={Callback} />
        <Route component={ConnectedMain} />
      </Switch>
    </Router>
  );
}

export default App;
