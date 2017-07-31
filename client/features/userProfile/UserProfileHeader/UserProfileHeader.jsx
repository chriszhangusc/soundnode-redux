import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'features/userProfile/userProfileSelectors';
import styled from 'styled-components';
import UserProfileAvatar from './UserProfileAvatar';
import UserProfileDetails from './UserProfileDetails';

// Container components should not have styles, try to extract reusable Wrapper components
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Section = styled.section`margin-right: 30px;`;

function UserProfileHeader({ avatarUrl, permalinkUrl, username, followersCount, description }) {
  return (
    <Wrapper>
      <Section>
        <UserProfileAvatar avatarUrl={avatarUrl} permalinkUrl={permalinkUrl} />
      </Section>
      <Section>
        <UserProfileDetails
          username={username}
          followersCount={followersCount}
          description={description}
        />
      </Section>
    </Wrapper>
  );
}

UserProfileHeader.defaultProps = {
  ...UserProfileAvatar.defaultProps,
  ...UserProfileDetails.defaultProps,
};

UserProfileHeader.propTypes = {
  avatarUrl: PropTypes.string,
  permalinkUrl: PropTypes.string,
  username: PropTypes.string,
  followersCount: PropTypes.string,
  description: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    avatarUrl: selectors.getUserAvatarUrl(state),
    permalinkUrl: selectors.getUserPermalinkUrl(state),
    username: selectors.getUsername(state),
    followersCount: selectors.getUserFollowersCount(state),
    description: selectors.getUserDescription(state),
  };
}

export default connect(mapStateToProps)(UserProfileHeader);
