import React from 'react';
import { connect } from 'react-redux';
import { getProfiledUser } from 'features/userProfile/userProfileSelectors';
import styled from 'styled-components';
import { getLargeVersion } from 'common/utils/imageUtils';
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
  const user = getProfiledUser(state);

  if (!user) return {};

  const {
    avatarUrl = '',
    permalinkUrl = '',
    username = '',
    followersCount = '0',
    description = '',
  } = user;

  return {
    avatarUrl: getLargeVersion(avatarUrl),
    permalinkUrl,
    username,
    followersCount: followersCount.toLocaleString(),
    description,
  };
}

export default connect(mapStateToProps)(UserProfileInfo);
