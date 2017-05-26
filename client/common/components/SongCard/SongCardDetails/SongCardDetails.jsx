import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/common/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'client/common/constants/routeConsts';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const Title = styled(Link)`
    display: -webkit-box;
    font-size: 1.05rem;
    font-weight: bold;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
`;

const Username = styled(Link)`
    display: inline-block;
    margin-left: 10px;
    color: ${FONT_COLOR_SECONDARY};
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px; /* Vertical align!! It should be equal to the height of avatar */
    max-width: 160px;
    font-size: 0.9rem;
`;

function SongCardDetails({ trackId, userId, userAvatar, title, username }) {
  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Wrapper>
      <Title to={trackUrl} title={title}>
        {title}
      </Title>
      <InnerWrapper>
        <Link to={userUrl} title={username}>
          <Avatar src={userAvatar} />
        </Link>
        <Username to={userUrl} title={username}>
          {username}
        </Username>
      </InnerWrapper>
    </Wrapper>
  );
}

SongCardDetails.propTypes = {
  trackId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  userAvatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default SongCardDetails;
