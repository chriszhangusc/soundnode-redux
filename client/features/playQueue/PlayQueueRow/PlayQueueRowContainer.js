import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from 'features/entities/entitiesSelectors';
import { isTrackActive } from 'features/player/playerSelectors';
import { updateActiveTrackIdAndPlay } from 'features/player/playerActions';
import PlayQueueRow from './PlayQueueRow';

const mapStateToProps = (state, { trackId, index }) => {
  // console.log(typeof trackId);
  const track = getTrackById(state, trackId);
  const artist = getUserByTrackId(state, trackId);
  return {
    index,
    trackId,
    active: isTrackActive(state, trackId),
    liked: false,
    title: track.title,
    artistName: artist.username,
  };
};
const mapDispatchToProps = (dispatch, { trackId }) => ({
  handleupdateActiveTrackId() {
    dispatch(updateActiveTrackIdAndPlay(trackId));
  },
  handleLikeSong() {
    // dispatch(startLikeSong(trackId));
  },
  handleUnlikeSong() {
    // dispatch(startUnlikeSong(trackId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayQueueRow);
