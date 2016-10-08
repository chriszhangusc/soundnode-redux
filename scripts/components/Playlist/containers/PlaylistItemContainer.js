import { connect } from 'react-redux';

import {
  getSingleSongIsActive,
  isSongLiked
} from 'client/modules/reducers';

import {
  sagaChangeSongAndPlay
} from 'client/modules/player/actions';

import {
  startLikeSong,
  startUnlikeSong
} from 'client/modules/user/actions';

import PlaylistItem from '../components/PlaylistItem';

const mapStateToProps = (state, ownProps) => {
  const { song, index } = ownProps;
  return {
    songId: song ? song.id : undefined,
    isActive: song ? getSingleSongIsActive(state, song.id) : false,
    title: song ? song.title : undefined,
    username: song && song.user ? song.user.username : undefined,
    isLiked: isSongLiked(state, song.id),
    index
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { song } = ownProps;
  return {
    handleChangeSong() {
      dispatch(sagaChangeSongAndPlay(song));
    },
    handleLikeSong() {
      dispatch(startLikeSong(song.id));
    },
    handleUnlikeSong() {
      dispatch(startUnlikeSong(song.id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
