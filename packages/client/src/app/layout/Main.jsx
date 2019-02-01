import React from 'react';
import NetworkDetector from '@soundnode-redux/client/src/features/network/NetworkDetector';
import LoadingOverlay from '@soundnode-redux/client/src/features/loadingOverlay/LoadingOverlay';
import styled from 'styled-components';
import Player from '@soundnode-redux/client/src/features/player/Player';
import Sidebar from '@soundnode-redux/client/src/features/sidebar/Sidebar';
import Navbar from '@soundnode-redux/client/src/common/components/Navbar';
import NotificationCenter from '@soundnode-redux/client/src/features/notification/NotificationCenter';
import PlayQueue from '@soundnode-redux/client/src/features/playQueue/PlayQueue';
import Routing from '@soundnode-redux/client/src/app/routing/Routing';
import RootModal from '@soundnode-redux/client/src/features/modals/root/RootModal';

const PageContentWrapper = styled.div`
  flex: 6;
  padding: 50px 20px 120px 100px;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  padding-top: 70px;
`;

function Main() {
  return (
    <MainWrapper>
      <LoadingOverlay />

      <Navbar />
      <Sidebar />
      <Player />
      <PlayQueue />

      <PageContentWrapper>
        <Routing />
      </PageContentWrapper>

      <NetworkDetector />
      <NotificationCenter />
      <RootModal />
    </MainWrapper>
  );
}

export default Main;
