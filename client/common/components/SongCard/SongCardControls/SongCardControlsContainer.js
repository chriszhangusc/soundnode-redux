import { connect } from 'react-redux';
import { getFavoriteTrackIds } from 'client/features/auth/authSelectors';
import { doLikeTrack, doDislikeTrack } from 'client/features/auth/authActions';
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
    const toggleLike = liked ? doDislikeTrack : doLikeTrack;
    dispatch(toggleLike(track.id));
  },
  handleCopyToClipboard() {
    dispatch(copyToClipboard(track.permalinkUrl, 'Track permalink copied to clipboard!'));
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
