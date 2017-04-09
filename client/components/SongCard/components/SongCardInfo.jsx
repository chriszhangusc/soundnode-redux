import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/components/Avatar';
import { Link } from 'react-router-dom';

const SongCardInfo = ({
  trackId,
  artistId,
  artistAvatar,
  title,
  artistName,
}) => (
  <div className="song-card-info-wrapper">
    <Avatar src={artistAvatar} />
    <div className="song-card-details">
      <Link to={`/track/${trackId}`} className="song-card-title">
        {title}
      </Link>
      <Link to={`/artist/${artistId}`} className="song-card-username">
        {artistName}
      </Link>
    </div>
  </div>
);

SongCardInfo.defaultProps = {
  trackId: 0,
  artistId: 0,
  artistAvatar: '',
  title: '',
  artistName: '',
};

SongCardInfo.propTypes = {
  trackId: PropTypes.number,
  artistId: PropTypes.number,
  artistAvatar: PropTypes.string,
  title: PropTypes.string,
  artistName: PropTypes.string,
};

export default SongCardInfo;
