import { connect } from 'react-redux';
import React from 'react';
// import { loadTrack } from 'client/modules/track/actions/track';

import {
  playSong,
  changeSongAndPlay,
  pauseSong
} from 'client/modules/player/actions';

import { startLikeSong, startUnlikeSong } from 'client/modules/user/actions';

import {
  getIsTrackFetching,
  getTrackRecord,
  isSongLiked,
  getSingleSongIsActive,
  getSingleSongPlayingState
} from 'client/modules/reducers';
import TrackDetails from '../components/TrackDetails';

const TrackDetailsContainer = props => <TrackDetails {...props} />;

const mapStateToProps = (state, ownProps) => ({
  isFetching: getIsTrackFetching(state),
  // artist: getTrackRecord(state).getArtist(),
  track: getTrackRecord(state),
  isLiked: isSongLiked(state, ownProps.params.trackId),
  isActive: getSingleSongIsActive(state, ownProps.params.trackId),
  isPlaying: getSingleSongPlayingState(state, ownProps.params.trackId)
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
