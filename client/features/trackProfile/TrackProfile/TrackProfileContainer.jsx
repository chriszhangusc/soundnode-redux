import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadTrackProfilePage,
  clearTrackState,
} from 'features/trackProfile/trackProfileActions';
import { isTrackFetching } from 'features/trackProfile/trackProfileSelectors';
import Spinner from 'common/components/Spinner';
import TrackProfile from './TrackProfile';

class TrackProfileContainer extends Component {
  // Initial Loading
  componentWillMount() {
    const { dispatch, match } = this.props;
    const trackId = match.params.trackId;
    dispatch(loadTrackProfilePage(trackId));
  }

  // Change from different single track routes.
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const curTrackId = this.props.match.params.trackId;
    const newTrackId = nextProps.match.params.trackId;

    // If curTrackId is undefined, it means this is the initial loading which is already
    // handled by CWM,
    // Check curTrackId and newTrackId to detect jumping from one track to another track.
    if (curTrackId !== newTrackId && curTrackId) {
      // Before jumping to new track profile page, clear old state.
      dispatch(clearTrackState());
      dispatch(loadTrackProfilePage(newTrackId));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearTrackState());
  }

  render() {
    const { fetching } = this.props;
    return (
      <div>
        {fetching ? <Spinner /> : <TrackProfile />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: isTrackFetching(state),
  };
}

TrackProfileContainer.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TrackProfileContainer);
