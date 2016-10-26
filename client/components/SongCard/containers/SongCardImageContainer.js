import { connect } from 'react-redux';
import { formatImageUrl } from 'client/utils/FormatUtils';

import {
  changeSongAndPlay,
  playSong,
  pauseSong
} from 'client/redux/modules/player';

import {
  updatePlaylistIfNeeded
} from 'client/redux/modules/playlist';

import {
  isTrackActive,
  isTrackPlaying
} from 'client/redux/modules/reducers';

import SongCardImage from '../components/SongCardImage';

const mapStateToProps = (state, { track }) => ({
  artworkUrl: formatImageUrl(track.get('artworkUrl')),
  active: isTrackActive(state, track.get('id')),
  playing: isTrackPlaying(state, track.get('id'))
});

// This is useful when you need to compute some action using stateProps
const mergeProps = (stateProps, { dispatch }, { track }) => ({
  ...stateProps,
  // Besides doing it this way, we could also do it in a thunk function
  //  or pass all args into components and assemble there
  handleImageClick: () => {
    // Maybe we should put them into one function?
    if (!stateProps.active) {
      // 1. Init playlist (with all tracks come after the current playing song)
      // if current playlist is empty. We need to access to currently loaded tracks in charts.
      // 2. If current playlist is not empty, do not mess with it, just add the current track
      // after the currently playing track.
      dispatch(updatePlaylistIfNeeded(track.get('id')));
      dispatch(changeSongAndPlay(track.get('id')));
    } else {
      // console.log('Toggle Song');
      dispatch(stateProps.playing ? pauseSong() : playSong());
    }
  }
});

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
