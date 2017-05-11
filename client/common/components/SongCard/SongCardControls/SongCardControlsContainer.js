import { connect } from 'react-redux';
import { startLikeSong, startUnlikeSong, isTrackLiked } from 'client/features/user';
import { copyToClipboard } from 'client/features/copy';
import SongCardControls from './SongCardControls';

const mapStateToProps = (state, { track }) => ({
  liked: isTrackLiked(state, track.id),
});

const mergeProps = ({ liked }, { dispatch }, { track }) => ({
  liked,
  handleToggleLike() {
    const toggleLike = liked ? startUnlikeSong : startLikeSong;
    dispatch(toggleLike(track.id));
  },
  handleCopyToClipboard() {
    dispatch(copyToClipboard(track.permalinkUrl, 'Track permalink copied to clipboard!'));
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
