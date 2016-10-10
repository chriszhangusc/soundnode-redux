import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { loadTrack } from 'client/modules/track/actions/track';
import {
  formatImageUrl,
  formatPlaybacks,
  formatLikes
 } from 'client/utils/FormatUtils';
import { t500x500 } from 'client/constants/ImageConstants';
import {
  getIsTrackFetching,
  getTrackTitle,
  getTrackDescription,
  getTrackArtworkUrl,
  getTrackCreatedAt,
  getTrackCommentCount,
  getTrackArtistName,
  getTrackPlaybackCount,
  isSongLiked,
  getTrackLikedCount
} from 'client/modules/reducers';
import TrackDetails from '../components/TrackDetails';


class TrackDetailsContainer extends Component {
  // Not supported by eslint
  // static propTypes = {
  //   dispatch: PropTypes.func
  // };

  componentWillMount() {
    // Fetch track here.
    const { params, dispatch } = this.props;
    const trackId = params.trackId;
    dispatch(loadTrack(trackId));
  }

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
  title: getTrackTitle(state),
  createdAt: getTrackCreatedAt(state).replace('+0000', ''), // Move this to a new function
  description: getTrackDescription(state),
  artworkUrl: formatImageUrl(getTrackArtworkUrl(state), t500x500),
  artistName: getTrackArtistName(state),
  commentCount: getTrackCommentCount(state),
  playbackCount: formatPlaybacks(getTrackPlaybackCount(state)),
  isLiked: isSongLiked(state, ownProps.params.trackId),
  likedCount: formatLikes(getTrackLikedCount(state))
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetailsContainer);
