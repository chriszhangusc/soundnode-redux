import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserProfilePage, clearUserState } from 'features/userProfile/userProfileActions';
import { getProfiledUserId, isUserFetching } from 'features/userProfile/userProfileSelectors';
import Spinner from 'common/components/Spinner';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';

import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;
    const userId = match.params.userId;
    dispatch(updateVisiblePlaylistName(`user-${userId}`));
    dispatch(loadUserProfilePage(userId));
  }

  // Change from different single track routes.
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const curUserId = this.props.match.params.userId;
    const newUserId = nextProps.match.params.userId;

    // If curTrackId is undefined, it means this is the initial loading which is already
    // handled by CWM,
    // Check curTrackId and newTrackId to detect jumping from one track to another track.
    if (curUserId !== newUserId && curUserId) {
      // Before jumping to new track profile page, clear old state.
      dispatch(clearUserState());
      dispatch(updateVisiblePlaylistName(`user-${newUserId}`));
      dispatch(loadUserProfilePage(newUserId));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearUserState());
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

const mapStateToProps = (state) => {
  const userId = getProfiledUserId(state);
  // const user = getProfiledUser(state, userId);
  return {
    fetching: isUserFetching(state),
    userId,
  };
};

UserProfileContainer.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.number,
  fetching: PropTypes.bool,
};

UserProfileContainer.defaultProps = {
  userId: null,
  fetching: false,
};

export default connect(mapStateToProps)(UserProfileContainer);
