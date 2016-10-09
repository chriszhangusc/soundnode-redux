import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { loadTrack } from 'client/modules/track/actions/track';
import { formatImageUrl } from 'client/utils/FormatUtils';
import { crop } from 'client/constants/ImageConstants';
import {
  getIsTrackFetching,
  getTrackTitle,
  getTrackDescription,
  getTrackArtworkUrl
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

const mapStateToProps = state => ({
  isFetching: getIsTrackFetching(state),
  title: getTrackTitle(state),
  description: getTrackDescription(state),
  artworkUrl: formatImageUrl(getTrackArtworkUrl(state), crop)
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetailsContainer);
