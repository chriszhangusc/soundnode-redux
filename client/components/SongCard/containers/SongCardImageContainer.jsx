import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { formatImageUrl } from 'client/utils/FormatUtils';

import {
  playSong,
  changeSongAndPlay,
  pauseSong
} from 'client/redux/modules/player';

import {
  isTrackActive,
  isTrackPlaying
} from 'client/redux/modules/reducers';

import SongCardImage from '../components/SongCardImage';


const SongCardImageContainer = (props) => {
  return (
    <SongCardImage
      artworkUrl={props.artworkUrl}
      active={props.active}
      playing={props.playing}
      handleImageClick={props.handleImageClick}
    />
  );
};

const mapStateToProps = (state, { track }) => ({
  artworkUrl: formatImageUrl(track.getArtworkUrl()),
  active: isTrackActive(state, track.getId()),
  playing: isTrackPlaying(state, track.getId())
});

const mapDispatchToProps = (dispatch, { playing, active }) => ({
  handleImageClick() {
    if (!active) {
      // dispatch(changeSongAndPlay(track, playlist));
    } else {
      dispatch(playing ? pauseSong() : playSong());
    }
  }
});

SongCardImageContainer.propTypes = {
  artworkUrl: PropTypes.string,
  active: PropTypes.bool,
  playing: PropTypes.bool,
  handleImageClick: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SongCardImageContainer);
