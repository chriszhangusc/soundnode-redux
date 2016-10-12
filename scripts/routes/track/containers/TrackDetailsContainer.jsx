import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
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
  getTrackArtistRecord
} from 'client/modules/reducers';
import TrackDetails from '../components/TrackDetails';


class TrackDetailsContainer extends Component {

  render() {
    return <TrackDetails {...this.props} />;
  }
}

TrackDetailsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  isFetching: getIsTrackFetching(state),
  artist: getTrackArtistRecord(state),
  track: getTrackRecord(state),
  isLiked: isSongLiked(state, ownProps.params.trackId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  // Fire if the user click on a song card that is active
  // handlePlaySong() { dispatch(playSong()); },
  // Fire if the user click on a song card that is not active
  // handleChangeSong() { dispatch(changeSongAndPlay(ownProps.song, true)); },
  // handlePauseSong() { dispatch(pauseSong()); },
  handleLikeClick() {
    dispatch(startLikeSong(ownProps.params.trackId));
  },
  handleUnlikeClick() {
    dispatch(startUnlikeSong(ownProps.params.trackId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetailsContainer);
