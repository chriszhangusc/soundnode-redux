import { connect } from 'react-redux';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';
import SongCardDetails from './SongCardDetails';

const mapStateToProps = (state, { track }) => {
  const user = getUserByTrackId(state, track.id);
  return {
    trackId: track.id,
    title: track.title,
    userAvatar: user.avatarUrl,
    username: user.username,
    userId: user.id,
  };
};

export default connect(mapStateToProps)(SongCardDetails);
