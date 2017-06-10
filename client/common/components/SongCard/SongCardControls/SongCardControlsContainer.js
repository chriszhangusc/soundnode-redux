import { connect } from 'react-redux';
import { getFavoriteTrackIds, getReposts } from 'client/features/auth/authSelectors';
import {
  doLikeTrack,
  doUnlikeTrack,
  createRepost,
  removeRepost,
} from 'client/features/auth/authActions';
import { copyToClipboard } from 'client/features/copy';
import SongCardControls from './SongCardControls';

function mapStateToProps(state, { track }) {
  const trackId = track.id;
  const favoriteTrackIds = getFavoriteTrackIds(state);
  const reposts = getReposts(state);
  return {
    liked: favoriteTrackIds.includes(trackId),
    reposted: reposts.includes(trackId),
  };
}

function mergeProps(props, { dispatch }, { track }) {
  const { liked, reposted } = props;
  return {
    ...props,
    handleToggleLike() {
      // Check sign in status
      const toggleLike = liked ? doUnlikeTrack : doLikeTrack;
      dispatch(toggleLike(track.id));
    },
    handleRepost() {
      const toggleRepost = reposted ? removeRepost : createRepost;
      dispatch(toggleRepost(track.id));
    },
    handleCopyToClipboard() {
      dispatch(
        copyToClipboard(
          track.permalinkUrl,
          'Permalink copied to clipboard',
          'Permalink failed to copy to clipboard',
        ),
      );
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
