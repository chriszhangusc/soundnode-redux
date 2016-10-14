import { connect } from 'react-redux';

import {
  getSingleSongIsActive,
  isSongLiked
} from 'client/modules/reducers';

import {
  changeSongAndPlay
} from 'client/modules/player/actions';

import {
  startLikeSong,
  startUnlikeSong
} from 'client/modules/user/actions';

import PlaylistItem from '../components/PlaylistItem';

const mapStateToProps = (state, { track, index }) => {
  return {
    trackId: track.getId(),
    isActive: getSingleSongIsActive(state, track.getId()),
    title: track.getTitle(),
    username: track.getArtist().getUsername(),
    isLiked: isSongLiked(state, track.getId()),
    index
  };
};
const mapDispatchToProps = (dispatch, { track }) => {
  return {
    handleChangeSong() {
      // Do not load playlist
      dispatch(changeSongAndPlay(track, false));
    },
    handleLikeSong() {
      dispatch(startLikeSong(track.getId()));
    },
    handleUnlikeSong() {
      dispatch(startUnlikeSong(track.getId()));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
