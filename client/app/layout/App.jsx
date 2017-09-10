import React from 'react';
import SC from 'soundcloud';
import PropTypes from 'prop-types';
import PlayQueue from 'features/playQueue/PlayQueue';
import Callback from 'common/components/Callback';
import NetworkDetector from 'features/network/NetworkDetector';
import GlobalOverlayLoader from 'features/globalOverlayLoader/GlobalOverlayLoader';
import styled from 'styled-components';
import Player from 'features/player/Player';
import Sidebar from 'features/sidebar/Sidebar';
import Navbar from 'common/components/Navbar';
import NotificationCenter from 'features/notification/NotificationCenter';
import { isLoginInProgress } from 'features/auth/authSelectors';
import { connect } from 'react-redux';
import { CLIENT_ID, REDIRECT_URI } from 'common/constants/authConsts';
import Routing from 'app/routing/Routing';
import { Route, Switch } from 'react-router-dom';
import { AUTH_CALLBACK_ROUTE } from 'common/constants/routeConsts';
import 'app/css/global';
import GlobalOverlay from 'common/components/GlobalOverlay';

SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'non-expiring',
});

const PageContentWrapper = styled.div`
  flex: 6;
  padding: 50px 20px 100px 100px;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainWrapper = styled.div`padding-top: 70px;`;

class Main extends React.Component {
  render() {
    return (
      <MainWrapper>
        <GlobalOverlayLoader />
        <Navbar />
        <Sidebar />
        <PageContentWrapper>
          <Routing />
          <Player />
          <PlayQueue />
        </PageContentWrapper>
        <NetworkDetector />
        <NotificationCenter />
      </MainWrapper>
    );
  }
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
