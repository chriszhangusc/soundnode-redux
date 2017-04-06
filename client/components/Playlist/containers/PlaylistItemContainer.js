import { connect } from 'react-redux';
import { getTrackById, getArtistByTrackId } from 'client/redux/modules/entities';
import { isTrackActive, changeSongAndPlay } from 'client/redux/modules/player';
import { isTrackLiked, startLikeSong, startUnlikeSong } from 'client/redux/modules/user';

import PlaylistItem from '../components/PlaylistItem';

const mapStateToProps = (state, { trackId, index }) => {
  // console.log(typeof trackId);
  const track = getTrackById(state, trackId);
  const artist = getArtistByTrackId(state, trackId);
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
