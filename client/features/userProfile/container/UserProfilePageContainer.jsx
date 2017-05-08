import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadUserProfilePage,
  clearUserState,
} from 'client/features/userProfile/userProfileActions';
import { getUserId, isUserFetching } from 'client/features/userProfile/userProfileSelectors';
import { getUserById } from 'client/features/entities/entitiesSelectors';
import Spinner from 'client/common/components/Spinner';

import UserProfilePage from '../components/UserProfilePage';

class UserProfilePageContainer extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;
    const userId = match.params.userId;
    dispatch(loadUserProfilePage(userId));
  }

  // componentWillReceiveProps(newProps) {

  // }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearUserState());
  }

  render() {
    return (
      <div>
        {this.props.userId && <UserProfilePage {...this.props} />}
        {this.props.fetching && <Spinner />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = getUserId(state);
  const user = getUserById(state, userId);
  return {
    fetching: isUserFetching(state),
    userId,
    trackCount: user ? user.trackCount.toLocaleString() : '0',
  };
};

UserProfilePageContainer.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.number,
  fetching: PropTypes.bool,
};

UserProfilePageContainer.defaultProps = {
  userId: undefined,
  fetching: false,
};

export default connect(mapStateToProps)(UserProfilePageContainer);
