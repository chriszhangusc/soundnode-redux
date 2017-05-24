import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserProfilePage, clearUserState } from 'client/features/userProfile/userProfileActions';
import { getProfiledUserId, getProfiledUser, isUserFetching } from 'client/features/userProfile/userProfileSelectors';
import Spinner from 'client/common/components/Spinner';

import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;
    const userId = match.params.userId;
    dispatch(loadUserProfilePage(userId));
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
  const user = getProfiledUser(state, userId);
  return {
    fetching: isUserFetching(state),
    userId,
    trackCount: user ? user.trackCount.toLocaleString() : '0',
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
