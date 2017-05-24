import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadTrackProfilePage,
  clearTrackState,
} from 'client/features/trackProfile/trackProfileActions';
import { isTrackFetching } from 'client/features/trackProfile/trackProfileSelectors';
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
