import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'client/constants/RouteConsts';
import styles from './SongCard.css';

function SongCardInfo({
  trackId,
  userId,
  userAvatar,
  title,
  username,
}) {
  return (
    <div className={styles.songCardInfoWrapper}>
      <Avatar src={userAvatar} />
      <div className={styles.songCardDetails}>
        <Link to={`${TRACK_PROFILE_ROUTE}/${trackId}`} className={styles.songCardTitle}>
          {title}
        </Link>
        <Link to={`${USER_PROFILE_ROUTE}/${userId}`} className={styles.songCardUsername}>
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
