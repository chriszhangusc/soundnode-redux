import React from 'react';
import PropTypes from 'prop-types';
import TrackImage from 'common/components/images/TrackImage';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import { connect } from 'react-redux';
import { isTrackActive, isTrackPlaying } from 'features/player/playerSelectors';
import { updateActiveTrackIdAndPlay, playSong, pauseSong } from 'features/player/playerActions';
import { switchActivePlaylistIfNeeded } from 'features/playlist/playlistActions';
import { getLargeVersion } from 'common/utils/imageUtils';

function SongCardImage({ active, playing, artworkUrl, handleImageClick }) {
  return (
    <TrackImage src={artworkUrl} size="medium">
      <PlaybackOverlay active={active} onClick={handleImageClick} playing={playing} />
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
  handleImageClick: PropTypes.func,
};

function mapStateToProps(state, { track }) {
  // const user = getUserById(state, track.userId);
  return {
    artworkUrl: getLargeVersion(track.artworkUrl),
    active: isTrackActive(state, track.id),
    playing: isTrackPlaying(state, track.id),
  };
}

// This is useful when you need to compute some action using stateProps
function mergeProps(stateProps, { dispatch }, { track }) {
  return {
    ...stateProps,
    // Besides doing it this way, we could also do it in a thunk function
    // or pass all args into components and assemble there
    handleImageClick() {
      if (!stateProps.active) {
        // Change song first and then switch active playlist
        dispatch(updateActiveTrackIdAndPlay(track.id));
        dispatch(switchActivePlaylistIfNeeded());
      } else {
        dispatch(stateProps.playing ? pauseSong() : playSong());
      }
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
