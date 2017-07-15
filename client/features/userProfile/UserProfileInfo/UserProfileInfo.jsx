import React from 'react';
import { connect } from 'react-redux';
import * as selectors from 'features/userProfile/userProfileSelectors';
import styled from 'styled-components';
import UserProfileAvatar from './UserProfileAvatar';
import UserProfileDetails from './UserProfileDetails';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Section = styled.section`margin-right: 30px;`;

function UserProfileInfo({ avatarUrl, permalinkUrl, username, followersCount, description }) {
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

function mapStateToProps(state) {
  return {
    avatarUrl: selectors.getUserAvatarUrl(state),
    permalinkUrl: selectors.getUserPermalinkUrl(state),
    username: selectors.getUsername(state),
    followersCount: selectors.getUserFollowersCount(state),
    description: selectors.getUserDescription(state),
  };
}

export default connect(mapStateToProps)(UserProfileInfo);
