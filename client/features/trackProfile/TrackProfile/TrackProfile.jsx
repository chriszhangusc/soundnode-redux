import React from 'react';
import { Grid } from 'react-bootstrap';
import styled from 'styled-components';
import TrackCoverImage from '../TrackProfileImage';
import TrackProfileDetails from '../TrackProfileDetails';
import TrackProfileComments from '../TrackProfileComments';

const HeaderWrapper = styled.div`
  display: flex;
`;

function TrackProfile() {
  return (
    <Grid fluid>
      <HeaderWrapper>
        <TrackCoverImage />
        <TrackProfileDetails />
      </HeaderWrapper>
      <TrackProfileComments />
    </Grid>
  );
}

export default TrackProfile;
