import React from 'react';
import PropTypes from 'prop-types';
import TrackImage from 'common/components/images/TrackImage';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import { connect } from 'react-redux';
import { isTrackActive, isTrackPlaying } from 'features/player/playerSelectors';
import * as playerActions from 'features/player/playerActions';
import { switchActivePlayQueueIfNeeded } from 'features/playQueue/playQueueActions';
import { getLargeVersion } from 'common/utils/imageUtils';

const handleImageClick = (togglePlaybackState, switchActivePlayQueueIfNeeded, trackId, e) => {
  e.preventDefault();
  switchActivePlayQueueIfNeeded();
  togglePlaybackState(trackId);
};

function SongCardImage({
  trackId,
  active,
  playing,
  artworkUrl,
  togglePlaybackState,
  switchActivePlayQueueIfNeeded,
}) {
  return (
    <TrackImage src={artworkUrl} size="medium">
      <PlaybackOverlay
        active={active}
        onClick={event =>
          handleImageClick(togglePlaybackState, switchActivePlayQueueIfNeeded, trackId, event)}
        playing={playing}
      />
    </TrackImage>
  );
}

SongCardImage.defaultProps = {
  artworkUrl: '',
  active: false,
  playing: false,
  handleImageClick: null,
};

SongCardImage.propTypes = {
  active: PropTypes.bool,
  playing: PropTypes.bool,
  artworkUrl: PropTypes.string,
};

function mapStateToProps(state, { track }) {
  // const user = getUserById(state, track.userId);
  return {
    trackId: track.id,
    artworkUrl: getLargeVersion(track.artworkUrl),
    active: isTrackActive(state, track.id),
    playing: isTrackPlaying(state, track.id),
  };
}

const actions = {
  ...playerActions,
  switchActivePlayQueueIfNeeded,
};

export default connect(mapStateToProps, actions)(SongCardImage);
