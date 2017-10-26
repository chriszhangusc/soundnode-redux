import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withScrollToTopOnEnter from 'common/hocs/withScrollToTopOnEnter';
import * as userProfileActions from 'features/userProfile/userProfileActions';
import { isPageLoading, getProfiledUserId } from 'features/userProfile/userProfileSelectors';
import UserProfileTracks from 'features/userProfile/UserProfileTracks';
import UserProfileHeader from 'features/userProfile/UserProfileHeader';
import PageTitle from 'common/components/PageTitle';

class UserProfile extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    resetUserProfileState: PropTypes.func.isRequired,
    loadUserProfileData: PropTypes.func.isRequired,
    pageLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { match } = this.props;
    const userId = match.params.userId;
    this.props.loadUserProfileData(userId);
  }

  // Handle route changes
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
    const { pageLoading, userId } = this.props;
    if (pageLoading) {
      return null;
    }
    return (
      <div>
        <UserProfileHeader />
        <PageTitle>Tracks</PageTitle>
        <UserProfileTracks name={`user-${userId}`} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageLoading: isPageLoading(state),
    userId: getProfiledUserId(state),
  };
}

// UserProfile.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.object,
//   }).isRequired,
//   resetUserProfileState: PropTypes.func.isRequired,
//   loadUserProfileData: PropTypes.func.isRequired,
//   pageLoading: PropTypes.bool.isRequired,
// };

export default compose(connect(mapStateToProps, userProfileActions), withScrollToTopOnEnter)(
  UserProfile,
);
