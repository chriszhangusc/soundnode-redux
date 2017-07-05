import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getLargeVersion } from 'common/utils/imageUtils';
import { connect } from 'react-redux';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';
import { formatTitle } from 'common/utils/formatUtils';
import PlayerTrackImage from './PlayerTrackImage';
import TrackDetails from './PlayerTrackDetails';

const PlayerTrackInfoWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: right;
`;

function PlayerTrackInfo({ artworkUrl, trackTitle, artistName, trackUrl, artistUrl }) {
  return (
    <PlayerTrackInfoWrapper>
      <PlayerTrackImage src={artworkUrl} linkTo={trackUrl} />
      <TrackDetails
        title={trackTitle}
        subtitle={artistName}
        trackUrl={trackUrl}
        artistUrl={artistUrl}
      />
    </PlayerTrackInfoWrapper>
  );
}

PlayerTrackInfo.defaultProps = {
  artworkUrl: undefined,
  trackUrl: undefined,
  artistUrl: undefined,
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

function mapStateToProps(state, { playerTrack }) {
  const trackId = playerTrack.id;
  const artist = getUserByTrackId(state, trackId);
  const userId = artist.id;
  return {
    artworkUrl: getLargeVersion(playerTrack.artworkUrl),
    trackTitle: playerTrack.title,
    artistName: formatTitle(artist.username),
    trackUrl: `/track/${trackId}`,
    artistUrl: `/artist/${userId}`,
  };
}

export default connect(mapStateToProps)(PlayerTrackInfo);
