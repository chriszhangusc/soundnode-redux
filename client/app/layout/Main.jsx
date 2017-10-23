import React from 'react';
import NetworkDetector from 'features/network/NetworkDetector';
import LoadingOverlay from 'features/loadingOverlay/LoadingOverlay';
import styled from 'styled-components';
import Player from 'features/player/Player';
import Sidebar from 'features/sidebar/Sidebar';
import Navbar from 'common/components/Navbar';
import NotificationCenter from 'features/notification/NotificationCenter';
import PlayQueue from 'features/playQueue/PlayQueue';
import Routing from 'app/routing/Routing';
import RootModal from 'features/modals/root/RootModal';
import Overlay from 'features/overlay/Overlay';

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
      <LoadingOverlay />
      <Navbar />
      <Sidebar />
      <PageContentWrapper>
        <Routing />
        <Player />
        <PlayQueue />
      </PageContentWrapper>
      <NetworkDetector />
      <NotificationCenter />
      <RootModal />
      <Overlay />
    </MainWrapper>
  );
}

export default Main;
