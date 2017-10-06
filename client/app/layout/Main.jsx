import React from 'react';
import NetworkDetector from 'features/network/NetworkDetector';
import GlobalOverlayLoader from 'features/globalOverlayLoader/GlobalOverlayLoader';
import styled from 'styled-components';
import Player from 'features/player/Player';
import Sidebar from 'features/sidebar/Sidebar';
import Navbar from 'common/components/Navbar';
import NotificationCenter from 'features/notification/NotificationCenter';
import PlayQueue from 'features/playQueue/PlayQueue';
import Routing from 'app/routing/Routing';

const PageContentWrapper = styled.div`
  flex: 6;
  padding: 50px 20px 120px 100px;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainWrapper = styled.div`padding-top: 70px;`;

function Main() {
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

export default Main;
