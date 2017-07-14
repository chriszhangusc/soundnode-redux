import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userProfileActions from 'features/userProfile/userProfileActions';
import { isPageLoading } from 'features/userProfile/userProfileSelectors';
import UserProfileTracks from 'features/userProfile/UserProfileTracks';
import UserProfileHeader from 'features/userProfile/UserProfileHeader';
import Spinner from 'common/components/Spinner';

import { Grid } from 'react-bootstrap';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;
    const userId = match.params.userId;
    this.props.loadUserProfileData(userId);
  }

  // Change from different single track routes.
  componentWillReceiveProps(nextProps) {
    const curUserId = this.props.match.params.userId;
    const newUserId = nextProps.match.params.userId;

    // If curTrackId is undefined, it means this is the initial loading which is already
    // handled by CWM,
    // Check curTrackId and newTrackId to detect jumping from one track to another track.
    if (curUserId !== newUserId && curUserId) {
      // Before jumping to new track profile page, clear old state.
      this.props.resetUserProfileState();
      this.props.loadUserProfileData(newUserId);
    }
  }

  componentWillUnmount() {
    this.props.resetUserProfileState();
  }

  render() {
    const { pageLoading } = this.props;

    if (!pageLoading) {
      return (
        <Grid fluid>
          <UserProfileHeader />
          <UserProfileTracks />
        </Grid>
      );
    }
    return <Spinner />;
  }
}

function mapStateToProps(state) {
  return {
    pageLoading: isPageLoading(state),
  };
}

UserProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  resetUserProfileState: PropTypes.func.isRequired,
  loadUserProfileData: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired,
};

UserProfile.defaultProps = {
  fetching: false,
};

export default connect(mapStateToProps, userProfileActions)(UserProfile);
