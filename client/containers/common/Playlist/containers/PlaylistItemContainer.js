import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from 'client/redux/modules/entities/selectors';
import { isTrackActive } from 'client/redux/modules/player/selectors';
import { changeSongAndPlay } from 'client/redux/modules/player/actions';

import { isTrackLiked, startLikeSong, startUnlikeSong } from 'client/redux/modules/user';

import PlaylistItem from '../components/PlaylistItem';

const mapStateToProps = (state, { trackId, index }) => {
  // console.log(typeof trackId);
  const track = getTrackById(state, trackId);
  const artist = getUserByTrackId(state, trackId);
  return {
    index,
    active: isTrackActive(state, trackId),
    liked: isTrackLiked(state, trackId),
    title: track.title,
    artistName: artist.username,
  };
};
const mapDispatchToProps = (dispatch, { trackId }) => ({
  handleChangeSong() {
    dispatch(changeSongAndPlay(trackId));
  },
  handleLikeSong() {
    dispatch(startLikeSong(trackId));
  },
  handleUnlikeSong() {
    dispatch(startUnlikeSong(trackId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
