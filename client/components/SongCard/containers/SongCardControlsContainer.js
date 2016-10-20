import { connect } from 'react-redux';
import { startLikeSong, startUnlikeSong } from 'client/redux/modules/user';
import { isTrackLiked } from 'client/redux/modules/reducers';
import { copyToClipboard } from 'client/redux/modules/utils';
import SongCardControls from '../components/SongCardControls';

const mapStateToProps = (state, { track }) => ({
  liked: isTrackLiked(state, track.getId())
});

const mapDispatchToProps = (dispatch, { track }) => {
  return ({
    handleLikeClick() {
      dispatch(startLikeSong(track.getId()));
    },
    handleUnlikeClick() {
      dispatch(startUnlikeSong(track.getId()));
    },
    handleCopyToClipboard() {
      dispatch(copyToClipboard(track.getPermalinkUrl()));
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SongCardControls);
