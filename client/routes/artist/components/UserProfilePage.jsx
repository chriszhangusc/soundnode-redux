import React from 'react';
import PropTypes from 'prop-types';
import UserTrackListContainer from '../container/UserTrackListContainer';
import UserInfoContainer from '../container/UserInfoContainer';

const UserProfilePage = ({ userId, trackCount }) => {
  return (
    <div className="container">
      <UserInfoContainer userId={userId} />
      <div className="artist-tracks-container">
        <div className="artist-tracks-title">
          <h3>Tracks ({trackCount}) :</h3>
          <UserTrackListContainer />
        </div>
      </div>
    </div>
  );
};

UserProfilePage.propTypes = {
  userId: PropTypes.number,
  trackCount: PropTypes.string,
};

UserProfilePage.defaultProps = {
  userId: null,
  trackCount: '0',
};

export default UserProfilePage;
