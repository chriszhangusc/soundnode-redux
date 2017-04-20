import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'client/constants/RouteConsts';

function SongCardInfo({ trackId, userId, userAvatar, title, username }) {
  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;
  return (
    <div className="song-card-info-wrapper">
      <Avatar src={userAvatar} />
      <div className="song-card-details">
        <Link to={trackUrl} className="song-card-title" title={title}>
          {title}
        </Link>
        <Link to={userUrl} className="song-card-username" title={username}>
          {username}
        </Link>
      </div>
    </div>
  );
}

SongCardInfo.defaultProps = {
  trackId: 0,
  userId: undefined,
  userAvatar: '',
  title: '',
  username: '',
};

SongCardInfo.propTypes = {
  trackId: PropTypes.number,
  userId: PropTypes.number,
  userAvatar: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
};

export default SongCardInfo;
