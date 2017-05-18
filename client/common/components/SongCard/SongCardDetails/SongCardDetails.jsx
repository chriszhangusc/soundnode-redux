import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'client/common/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'client/common/constants/RouteConsts';
import styled from 'styled-components';
import { media } from 'client/app/css/styleUtils';

// const Wrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: left;
// `;

// const SONGCARD_DETAILS_WIDTH_MD = '150px';
// const SONGCARD_DETAILS_WIDTH_LG = '170px';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  margin-top: 10px;
`;

const UsernameWrapper = styled.div`
  display: inline-block;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 40px;
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
        <Avatar src={userAvatar} />
        <UsernameWrapper>
          <Link to={userUrl} className="song-card-username" title={username}>
            {username}
          </Link>
        </UsernameWrapper>
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
