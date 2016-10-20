import { connect } from 'react-redux';
import { formatImageUrl } from 'client/utils/FormatUtils';

import {
  changeSongAndPlay,
  playSong,
  pauseSong
} from 'client/redux/modules/player';

import {
  isTrackActive,
  isTrackPlaying
} from 'client/redux/modules/reducers';

import SongCardImage from '../components/SongCardImage';

const mapStateToProps = (state, { track }) => ({
  artworkUrl: formatImageUrl(track.getArtworkUrl()),
  active: isTrackActive(state, track.getId()),
  playing: isTrackPlaying(state, track.getId())
});

// This is useful when you need to compute some action using stateProps
const mergeProps = (stateProps, { dispatch }, { track }) => ({
  ...stateProps,
  // Besides doing it this way, we could also do it in a thunk function
  //  or pass all args into components and assemble there
  handleImageClick: () => {
    if (!stateProps.active) {
      console.log('changeSongAndPlay');
      dispatch(changeSongAndPlay(track.getId()));
    } else {
      // console.log('Toggle Song');
      dispatch(stateProps.playing ? pauseSong() : playSong());
    }
  }
});

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
