import { connect } from 'react-redux';
import { getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import SongCardDetails from './SongCardDetails';

const mapStateToProps = (state, { track }) => {
  const user = getUserByTrackId(state, track.id);
  return {
    trackId: track.id,
    title: track.title,
    userAvatar: user && user.avatarUrl,
    username: user && user.username,
    userId: user && user.id,
  };
};

export default connect(mapStateToProps)(SongCardDetails);
