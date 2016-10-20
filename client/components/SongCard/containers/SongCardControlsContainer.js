import { connect } from 'react-redux';
import { startLikeSong, startUnlikeSong } from 'client/redux/modules/user';
import { isTrackLiked } from 'client/redux/modules/reducers';
import { copyToClipboard } from 'client/redux/modules/utils';
import SongCardControls from '../components/SongCardControls';

const mapStateToProps = (state, { track }) => ({
  liked: isTrackLiked(state, track.getId())
});

const mergeProps = ({ liked }, { dispatch }, { track }) => ({
  liked,
  handleToggleLike() {
    const toggleLike = liked ? startUnlikeSong : startLikeSong;
    dispatch(toggleLike(track.getId()));
  },
  handleCopyToClipboard() {
    dispatch(copyToClipboard(track.getPermalinkUrl()));
  }
});

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
