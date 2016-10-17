import { connect } from 'react-redux';
import React from 'react';
import { startLikeSong, startUnlikeSong } from 'client/redux/modules/user';
import {
  isTrackFetching,
  getTrackRecord,
  isSongLiked,
  getSingleSongIsActive,
  getSingleSongPlayingState,
  isTrackCommentsFetching,
  getTrackComments
} from 'client/redux/modules/reducers';
import {
  playSong,
  changeSongAndPlay,
  pauseSong
} from 'client/redux/modules/player';
import TrackDetails from '../components/TrackDetails';

const TrackDetailsContainer = props => <TrackDetails {...props} />;

const mapStateToProps = (state, ownProps) => ({
  isTrackFetching: isTrackFetching(state),
  isCommentsFetching: isTrackCommentsFetching(state),
  track: getTrackRecord(state),
  isLiked: isSongLiked(state, ownProps.params.trackId),
  isActive: getSingleSongIsActive(state, ownProps.params.trackId),
  isPlaying: getSingleSongPlayingState(state, ownProps.params.trackId),
  comments: getTrackComments(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  // Fire if the user click on a song card that is active
  handlePlaySong() { dispatch(playSong()); },
  // Fire if the user click on a song card that is not active
  handleChangeSong(track) { dispatch(changeSongAndPlay(track)); },
  handlePauseSong() { dispatch(pauseSong()); },
  handleLikeClick() {
    dispatch(startLikeSong(ownProps.params.trackId));
  },
  handleUnlikeClick() {
    dispatch(startUnlikeSong(ownProps.params.trackId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetailsContainer);
