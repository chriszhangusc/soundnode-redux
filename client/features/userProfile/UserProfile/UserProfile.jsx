import React from 'react';
import PropTypes from 'prop-types';
import UserProfileTracks from 'features/userProfile/UserProfileTracks';
import UserProfileDetails from 'features/userProfile/UserProfileDetails';
import { Grid } from 'react-bootstrap';

const UserProfile = ({ userId }) => (
  <Grid fluid>
    <UserProfileDetails userId={userId} />
    <h3>Tracks:</h3>
    <UserProfileTracks />
  </Grid>
);

UserProfile.propTypes = {
  userId: PropTypes.number,
};

UserProfile.defaultProps = {
  userId: null,
};

export default UserProfile;
