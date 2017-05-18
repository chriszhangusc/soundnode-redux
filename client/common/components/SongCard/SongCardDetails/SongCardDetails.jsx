import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/common/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'client/common/constants/RouteConsts';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  margin-top: 10px;
`;

function SongCardDetails({ trackId, userId, userAvatar, title, username }) {
  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Wrapper>
      <Link to={trackUrl} className="song-card-title" title={title}>
        {title}
      </Link>

      <InnerWrapper>
        <Link to={userUrl} title={username}>
          <Avatar src={userAvatar} />
        </Link>
        <Link to={userUrl} className="song-card-username" title={username}>
          {username}
        </Link>
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
