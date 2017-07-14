import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as trackProfileActions from 'features/trackProfile/trackProfileActions';
import { isPageLoading } from 'features/trackProfile/trackProfileSelectors';
import Spinner from 'common/components/Spinner';
import { Grid } from 'react-bootstrap';

import TrackProfileComments from '../TrackProfileComments';
import TrackProfileHeader from '../TrackProfileHeader';

class TrackProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    const trackId = match.params.trackId;
    this.props.loadTrackProfileData(trackId);
  }

  // Change from different single track routes.
  componentWillReceiveProps(nextProps) {
    const curTrackId = this.props.match.params.trackId;
    const newTrackId = nextProps.match.params.trackId;

    // If curTrackId is undefined, it means this is the initial loading which is already
    // handled by CWM,
    // Check curTrackId and newTrackId to detect jumping from one track to another track.
    if (curTrackId !== newTrackId && curTrackId) {
      // Before jumping to new track profile page, clear old state.
      this.props.resetTrackProfileState();
      this.props.loadTrackProfileData(newTrackId);
    }
  }

  componentWillUnmount() {
    this.props.resetTrackProfileState();
  }

  render() {
    const { fetching } = this.props;
    if (fetching) {
      // If comments or profiled track is fetching, show spinner
      return <Spinner />;
    }
    return (
      <Grid fluid>
        <TrackProfileHeader />
        <TrackProfileComments />
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: isPageLoading(state),
  };
}

TrackProfile.propTypes = {
  resetTrackProfileState: PropTypes.func.isRequired,
  loadTrackProfileData: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, trackProfileActions)(TrackProfile);
