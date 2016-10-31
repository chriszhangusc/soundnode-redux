import { connect } from 'react-redux';
import { startLikeSong, startUnlikeSong, isTrackLiked } from 'client/redux/modules/user';
import { copyToClipboard } from 'client/redux/modules/copy';
import SongCardControls from '../components/SongCardControls';

const mapStateToProps = (state, { track }) => ({
  liked: isTrackLiked(state, track.get('id')),
});

const mergeProps = ({ liked }, { dispatch }, { track }) => ({
  liked,
  handleToggleLike() {
    const toggleLike = liked ? startUnlikeSong : startLikeSong;
    dispatch(toggleLike(track.get('id')));
  },
  handleCopyToClipboard() {
    dispatch(copyToClipboard(track.get('permalinkUrl'), 'Track permalink copied to clipboard!'));
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
