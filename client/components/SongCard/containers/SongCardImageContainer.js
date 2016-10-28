import { connect } from 'react-redux';
import { formatImageUrl } from 'client/utils/FormatUtils';

import {
  isTrackActive,
  isTrackPlaying,
  sagaChangeSongAndPlay,
  playSong,
  pauseSong,
} from 'client/redux/modules/player';

import SongCardImage from '../components/SongCardImage';

const mapStateToProps = (state, { track }) => ({
  artworkUrl: formatImageUrl(track.get('artworkUrl')),
  active: isTrackActive(state, track.get('id')),
  playing: isTrackPlaying(state, track.get('id')),
});

// This is useful when you need to compute some action using stateProps
const mergeProps = (stateProps, { dispatch }, { track, trackIds }) => ({
  ...stateProps,
  // Besides doing it this way, we could also do it in a thunk function
  //  or pass all args into components and assemble there
  handleImageClick() {
    if (!stateProps.active) {
      dispatch(sagaChangeSongAndPlay(track.get('id'), trackIds));
    } else {
      dispatch(stateProps.playing ? pauseSong() : playSong());
    }
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
