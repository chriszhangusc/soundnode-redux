import React from 'react';
import SC from 'soundcloud';
import PropTypes from 'prop-types';
import Playlist from 'features/playlist/Playlist';
import Nav from 'common/components/Nav';
import Sidebar from 'common/components/Sidebar';
import Callback from 'common/components/Callback';
import GlobalEvents from 'features/global/GlobalEvents';
import Loadable from 'react-loading-overlay';
import styled from 'styled-components';
import Player from 'features/player/Player';
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
import Routing from 'app/routing/Routing';
import { Route, Switch } from 'react-router-dom';
import { AUTH_CALLBACK_ROUTE } from 'common/constants/routeConsts';

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
          <Routing />
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
    <Switch>
      <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
      <Route component={ConnectedMain} />
    </Switch>
  );
}

export default App;
