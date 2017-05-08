import { connect } from 'react-redux';
import { t500x500 } from 'client/common/constants/ImageConstants';
import { formatPlaybacks, formatLikes, formatImageUrl } from 'client/common/utils/FormatUtils';
import { isTrackLiked, startLikeSong, startUnlikeSong } from 'client/features/user';

import {
  playSong,
  pauseSong,
  sagaChangeSongAndPlay,
  isTrackActive,
  isTrackPlaying,
} from 'client/features/player';

import TrackImage from '../components/TrackImage';

const mapStateToProps = (state, { track }) => {
  const trackId = track.get('id');
  return {
    artworkUrl: formatImageUrl(track.get('artworkUrl'), t500x500),
    playbackCount: formatPlaybacks(track.get('playbackCount')),
    likeCount: formatLikes(track.get('favoritingsCount')),
    playing: isTrackPlaying(state, trackId),
    liked: isTrackLiked(state, trackId),
    active: isTrackActive(state, trackId),
  };
};


const mergeProps = (stateProps, { dispatch }, { track }) => {
  const { playing, active, liked } = stateProps;
  const trackId = track.get('id');
  return {
    ...stateProps,
    // FIXME: Add to current play queue?
    handleImageClick() {
      if (active) {
        dispatch(playing ? pauseSong() : playSong());
      } else {
        dispatch(sagaChangeSongAndPlay(trackId));
      }
    },
    handleToggleLike() {
      dispatch(liked ? startUnlikeSong(trackId) : startLikeSong(trackId));
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(TrackImage);
