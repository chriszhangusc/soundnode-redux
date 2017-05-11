import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultArtworkImage from 'assets/images/default-artwork.png';

const PlayerTrackInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

function PlayerTrackInfo({ artworkUrl, trackTitle, artistName, trackUrl, artistUrl }) {
  return (
    <PlayerTrackInfoWrapper>
      <Link to={trackUrl}>
        <img alt="Not Found" className="player-image" src={artworkUrl || defaultArtworkImage} />
      </Link>
      <div className="player-song-card-details">
        <Link to={trackUrl} className="song-card-title">
          {trackTitle}
        </Link>
        <Link to={artistUrl} className="song-card-username">
          {artistName}
        </Link>
      </div>
    </PlayerTrackInfoWrapper>
  );
}

PlayerTrackInfo.defaultProps = {
  artworkUrl: '',
  trackUrl: '',
  artistUrl: '',
  artistName: '',
  trackTitle: '',
};

PlayerTrackInfo.propTypes = {
  artworkUrl: PropTypes.string,
  trackUrl: PropTypes.string,
  artistUrl: PropTypes.string,
  artistName: PropTypes.string,
  trackTitle: PropTypes.string,
};

export default PlayerTrackInfo;
