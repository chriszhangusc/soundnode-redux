import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';
import defaultArtworkImage from 'assets/images/default-artwork.png';

const PlayerTrackInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const TrackImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const TrackTitle = styled(Link)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 32px;
  width: 200px;
  font-size: 0.9rem;
`;

const ArtistName = styled(Link)`
  display: inline-block;
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.9rem;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function PlayerTrackInfo({ artworkUrl, trackTitle, artistName, trackUrl, artistUrl }) {
  return (
    <PlayerTrackInfoWrapper>
      <Link to={trackUrl}>
        <TrackImage alt="Not Found" src={artworkUrl || defaultArtworkImage} />
      </Link>
      <DetailsWrapper>
        <TrackTitle to={trackUrl} title={trackUrl}>
          {trackTitle}
        </TrackTitle>
        <ArtistName to={artistUrl} title={artistUrl}>
          {artistName}
        </ArtistName>
      </DetailsWrapper>
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
