import React from 'react';
import PropTypes from 'prop-types';
import UserProfileTracks from 'client/features/userProfile/UserProfileTracks';
import UserProfileDetails from 'client/features/userProfile/UserProfileDetails';
import { Grid } from 'react-bootstrap';

const UserProfile = ({ userId, trackCount }) => (
  <Grid fluid>
    <UserProfileDetails userId={userId} />
    <h3>Tracks ({trackCount}) :</h3>
    <UserProfileTracks />
  </Grid>
);

UserProfile.propTypes = {
  userId: PropTypes.number,
  trackCount: PropTypes.string,
};

UserProfile.defaultProps = {
  userId: null,
  trackCount: '0',
};

export default UserProfile;
