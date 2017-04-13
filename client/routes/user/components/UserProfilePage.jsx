import React from 'react';
import PropTypes from 'prop-types';
import UserTrackListContainer from '../container/UserTrackListContainer';
import UserInfoContainer from '../container/UserInfoContainer';

const UserProfilePage = ({ userId, trackCount }) => {
  return (
    <div className="container">
      <UserInfoContainer userId={userId} />
      <div className="user-tracks-container">
        <div className="user-tracks-title">
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
