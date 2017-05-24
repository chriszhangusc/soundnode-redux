import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import { isTrackActive } from 'client/features/player/playerSelectors';
import { changeSongAndPlay } from 'client/features/player/playerActions';

// import { isTrackLiked, startLikeSong, startUnlikeSong } from 'client/features/user';

import PlaylistRow from './PlaylistRow';

const mapStateToProps = (state, { trackId, index }) => {
  // console.log(typeof trackId);
  const track = getTrackById(state, trackId);
  const artist = getUserByTrackId(state, trackId);
  return {
    index,
    active: isTrackActive(state, trackId),
    liked: false,
    title: track.title,
    artistName: artist.username,
  };
};
const mapDispatchToProps = (dispatch, { trackId }) => ({
  handleChangeSong() {
    dispatch(changeSongAndPlay(trackId));
  },
  handleLikeSong() {
    // dispatch(startLikeSong(trackId));
  },
  handleUnlikeSong() {
    // dispatch(startUnlikeSong(trackId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistRow);
