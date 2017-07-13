import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as trackProfileActions from 'features/trackProfile/trackProfileActions';
import { isTrackFetching } from 'features/trackProfile/trackProfileSelectors';
import Spinner from 'common/components/Spinner';
import { Grid } from 'react-bootstrap';

import TrackProfileComments from '../TrackProfileComments';
import TrackProfileHeader from '../TrackProfileHeader';

class TrackProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.renderTrackProfile = this.renderTrackProfile.bind(this);
  }

  // Initial Loading
  componentDidMount() {
    const { match } = this.props;
    const trackId = match.params.trackId;
    this.props.loadTrackProfilePage(trackId);
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
      this.props.loadTrackProfilePage(newTrackId);
    }
  }

  componentWillUnmount() {
    this.props.resetTrackProfileState();
  }

  // Render main part of track profile page
  renderTrackProfile() {}

  render() {
    const { fetching } = this.props;
    if (fetching) {
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
    fetching: isTrackFetching(state),
  };
}

TrackProfileContainer.propTypes = {
  resetTrackProfileState: PropTypes.func.isRequired,
  loadTrackProfilePage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, trackProfileActions)(TrackProfileContainer);
