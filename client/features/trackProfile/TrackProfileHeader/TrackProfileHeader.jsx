import React from 'react';
import styled from 'styled-components';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';

const HeaderWrapper = styled.div`display: flex;`;

function TrackProfileHeader() {
  return (
    <HeaderWrapper>
      <TrackProfileImage />
      <TrackProfileDetails />
    </HeaderWrapper>
  );
}

export default TrackProfileHeader;
