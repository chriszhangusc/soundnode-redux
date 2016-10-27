import { connect } from 'react-redux';

import {
  isTrackActive,
  isTrackLiked,
  getTrackById,
  getArtistByTrackId
} from 'client/redux/modules/reducers';

import {
  changeSongAndPlay // Should seperate logic of playlist
} from 'client/redux/modules/player';

import {
  startLikeSong,
  startUnlikeSong
} from 'client/redux/modules/user';

import PlaylistItem from '../components/PlaylistItem';

const mapStateToProps = (state, { trackId, index }) => {
  // console.log(typeof trackId);
  const track = getTrackById(state, trackId);
  const artist = getArtistByTrackId(state, trackId);
  return {
    active: isTrackActive(state, trackId),
    liked: isTrackLiked(state, trackId),
    title: track.get('title'),
    artistName: artist.get('username'),
    index
  };
};
const mapDispatchToProps = (dispatch, { trackId }) => ({
  handleChangeSong() {
    // Do not load playlist
    dispatch(changeSongAndPlay(trackId));
  },
  handleLikeSong() {
    dispatch(startLikeSong(trackId));
  },
  handleUnlikeSong() {
    dispatch(startUnlikeSong(trackId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
