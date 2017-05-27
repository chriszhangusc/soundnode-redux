import { connect } from 'react-redux';
import { getFavoriteTrackIds } from 'client/features/auth/authSelectors';
import { doLikeTrack, doDislikeTrack } from 'client/features/auth/authActions';
import { copyToClipboard } from 'client/features/copy';
import { notificationSuccess, notificationWarning } from 'client/features/notification/notificationActions';
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
    dispatch(notificationSuccess('Please SignIn first'));
    // Check sign in status
    const toggleLike = liked ? doDislikeTrack : doLikeTrack;
    dispatch(toggleLike(track.id));
  },
  handleCopyToClipboard() {
    dispatch(copyToClipboard(track.permalinkUrl, 'Track permalink copied to clipboard!'));
    // dispatch(createNotificationSuccess('Track permalink copied to clipboard!'));
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
