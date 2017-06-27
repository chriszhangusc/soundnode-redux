import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userProfileActions from 'features/userProfile/userProfileActions';
import { getProfiledUserId, isUserFetching } from 'features/userProfile/userProfileSelectors';
import Spinner from 'common/components/Spinner';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';

import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
  componentWillMount() {
    const { match } = this.props;
    const userId = match.params.userId;
    this.props.updateVisiblePlaylistName(`user-${userId}`);
    this.props.loadUserProfilePage(userId);
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
      this.props.clearUserState();
      this.props.updateVisiblePlaylistName(`user-${newUserId}`);
      this.props.loadUserProfilePage(newUserId);
    }
  }

  componentWillUnmount() {
    this.props.clearUserState();
  }

  render() {
    return (
      <div>
        {this.props.userId && <UserProfile {...this.props} />}
        {this.props.fetching && <Spinner />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const userId = getProfiledUserId(state);
  return {
    fetching: isUserFetching(state),
    userId,
  };
}

UserProfileContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  updateVisiblePlaylistName: PropTypes.func.isRequired,
  clearUserState: PropTypes.func.isRequired,
  loadUserProfilePage: PropTypes.func.isRequired,
  userId: PropTypes.number,
  fetching: PropTypes.bool,
};

UserProfileContainer.defaultProps = {
  userId: null,
  fetching: false,
};

const actions = {
  ...userProfileActions,
  updateVisiblePlaylistName,
};

export default connect(mapStateToProps, actions)(UserProfileContainer);
