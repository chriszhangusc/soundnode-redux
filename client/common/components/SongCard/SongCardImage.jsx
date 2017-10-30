import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackImage from 'common/components/images/TrackImage';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import { isTrackPlaying, isPlayerLoading } from 'features/player/playerSelectors';
import { togglePlaybackState } from 'features/player/playerActions';
import { getLargeVersion } from 'common/utils/imageUtils';

function SongCardImage({
  trackId,
  playlist,
  active,
  playing,
  artworkUrl,
  loading,
  handleImageClick,
}) {
  return (
    <TrackImage src={artworkUrl} size="medium">
      <PlaybackOverlay
        active={active}
        loading={loading}
        playing={playing}
        onClick={() => {
          if (!loading) {
            handleImageClick(trackId, playlist);
          }
          // Sync with currently active play queue
        }}
      />
    </TrackImage>
  );
}

function mapStateToProps(state, { track, active }) {
  const { id, artworkUrl } = track;
  return {
    active,
    loading: isPlayerLoading(state),
    trackId: id,
    artworkUrl: getLargeVersion(artworkUrl),
    playing: isTrackPlaying(state, id),
  };
}

const actions = {
  handleImageClick: togglePlaybackState,
};

const Connected = connect(mapStateToProps, actions)(SongCardImage);

/* Prop type validation */

const propTypes = {
  track: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

const injectedProps = {
  trackId: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string,
  handleImageClick: PropTypes.func.isRequired,
};

SongCardImage.defaultProps = {
  artworkUrl: '',
};

SongCardImage.propTypes = {
  ...propTypes,
  ...injectedProps,
};

Connected.propTypes = propTypes;

export default Connected;
