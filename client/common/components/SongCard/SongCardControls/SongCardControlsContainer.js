import { connect } from 'react-redux';
import { getFavoriteTrackIds } from 'client/features/auth/authSelectors';
import { doLikeTrack, doUnlikeTrack } from 'client/features/auth/authActions';
import { copyToClipboard } from 'client/features/copy';
import SongCardControls from './SongCardControls';

const mapStateToProps = (state, { track }) => {
  const favoriteTrackIds = getFavoriteTrackIds(state);
  return {
    liked: favoriteTrackIds.includes(track.id),
  };
};

const mergeProps = ({ liked }, { dispatch }, { track }) => ({
  liked,
  handleToggleLike() {
    // Check sign in status
    const toggleLike = liked ? doUnlikeTrack : doLikeTrack;
    dispatch(toggleLike(track.id));
  },
  handleCopyToClipboard() {
    dispatch(copyToClipboard(track.permalinkUrl));
    // dispatch(createNotificationSuccess('Track permalink copied to clipboard!'));
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
