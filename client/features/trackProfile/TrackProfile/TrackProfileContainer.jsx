import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadTrackProfilePage,
  clearTrackState,
} from 'client/features/trackProfile/trackProfileActions';
import {
  getProfiledTrackId,
  getProfiledTrack,
  isTrackFetching,
} from 'client/features/trackProfile/trackProfileSelectors';
import Spinner from 'client/common/components/Spinner';

import TrackProfile from './TrackProfile';

class TrackProfileContainer extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;
    const trackId = match.params.trackId;
    dispatch(loadTrackProfilePage(trackId));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearTrackState());
  }

  render() {
    const { fetching } = this.props;
    return (
      <div>
        {fetching ? <Spinner /> : <TrackProfile {...this.props} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const trackId = getProfiledTrackId(state);
  // const track = getProfiledTrack(state, trackId);
  return {
    fetching: isTrackFetching(state),
  };
}

TrackProfileContainer.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

TrackProfileContainer.defaultProps = {
  userId: null,
};

export default connect(mapStateToProps)(TrackProfileContainer);
