import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { startLikeSong, startUnlikeSong } from 'client/redux/modules/user';
import {
  playSong,
  changeSongAndPlay,
  pauseSong
} from 'client/redux/modules/player';
import {
  isTrackFetching,
  getTrackRecord,
  isSongLiked,
  getSingleSongIsActive,
  getSingleSongPlayingState,
  isTrackCommentsFetching,
  getTrackComments
} from 'client/redux/modules/reducers';
import Spinner from 'client/components/Spinner';
import CommentSection from '../components/CommentSection';
import TrackImage from '../components/TrackImage';
import TrackInfo from '../components/TrackInfo';

const TrackDetailsContainer = (props) => {
  if (props.isTrackFetching) return <Spinner />;
  return (
    <div className="container">
      <div className="track-info-container">
        <TrackImage {...props} />
        <TrackInfo {...props} />
      </div>
      {props.isCommentsFetching || <CommentSection {...props} />}
    </div>
  );
};

TrackDetailsContainer.propTypes = {
  isTrackFetching: PropTypes.bool.isRequired,
  isCommentsFetching: PropTypes.bool.isRequired
};

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
  handleChangeSong() { dispatch(changeSongAndPlay(ownProps.track)); },
  handlePauseSong() { dispatch(pauseSong()); },
  handleLikeClick() {
    dispatch(startLikeSong(ownProps.params.trackId));
  },
  handleUnlikeClick() {
    dispatch(startUnlikeSong(ownProps.params.trackId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetailsContainer);
