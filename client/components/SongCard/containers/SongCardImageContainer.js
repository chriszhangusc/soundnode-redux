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
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { active, playing } = stateProps;
  const { dispatch } = dispatchProps;
  const { track } = ownProps;

  return {
    ...stateProps,
    handleImageClick: () => {
      if (!active) {
        console.log('changeSongAndPlay');
        dispatch(changeSongAndPlay(track));
      } else {
        console.log('Toggle Song');
        dispatch(playing ? pauseSong() : playSong());
      }
    }
  };
};

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
