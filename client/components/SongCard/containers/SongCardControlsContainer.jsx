// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { startLikeSong, startUnlikeSong } from 'client/redux/modules/user';
import { isTrackLiked } from 'client/redux/modules/reducers';
import copy from 'copy-to-clipboard';
import { COPY_SUCCESS } from 'client/constants/ActionTypes';
import SongCardControls from '../components/SongCardControls';

const mapStateToProps = (state, { track }) => ({
  liked: isTrackLiked(state, track.getId())
});

const mapDispatchToProps = (dispatch, { track }) => ({
  handleLikeClick() {
    dispatch(startLikeSong(track.getId()));
  },
  handleUnlikeClick() {
    dispatch(startUnlikeSong(track.getId()));
  },
  handleCopyToClipboard() {
    copy(track.getPermalinkUrl());
    dispatch({
      type: COPY_SUCCESS,
      payload: {
        message: 'Track URL copied to clipboard'
      }
    });
  }
});

// SongCardControls.propTypes = {
//   liked: PropTypes.bool,
//   handleLikeClick: PropTypes.func,
//   handleUnlikeClick: PropTypes.func,
//   handleCopyToClipboard: PropTypes.func
// };

export default connect(mapStateToProps, mapDispatchToProps)(SongCardControls);
