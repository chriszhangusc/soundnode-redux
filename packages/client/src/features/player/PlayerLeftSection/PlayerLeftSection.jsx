import React from 'react';
import PropTypes from 'prop-types';
import { getLargeVersion } from '@soundnode-redux/client/src/common/utils/imageUtils';
import { connect } from 'react-redux';
import { getUserByTrackId } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { formatTitle } from '@soundnode-redux/client/src/common/utils/formatUtils';
import PlayerTrackImage from './PlayerTrackImage';
import TrackDetails from './PlayerTrackDetails';
import Wrapper from './Wrapper';

function PlayerLeftSection({ artworkUrl, trackTitle, artistName, trackUrl, artistUrl }) {
  return (
    <Wrapper>
      <PlayerTrackImage src={artworkUrl} linkTo={trackUrl} />
      <TrackDetails
        title={trackTitle}
        subtitle={artistName}
        trackUrl={trackUrl}
        artistUrl={artistUrl}
      />
    </Wrapper>
  );
}

PlayerLeftSection.defaultProps = {
  artworkUrl: '',
  trackUrl: '',
  artistUrl: '',
  artistName: '',
  trackTitle: '',
};

PlayerLeftSection.propTypes = {
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

export default connect(mapStateToProps)(PlayerLeftSection);
