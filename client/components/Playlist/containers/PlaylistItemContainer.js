import { connect } from 'react-redux';

import {
  getSingleSongIsActive,
  isSongLiked
} from 'client/redux/modules/reducers';

import {
  changeSongAndPlay
} from 'client/redux/modules/player';

import {
  startLikeSong,
  startUnlikeSong
} from 'client/redux/modules/user';

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
