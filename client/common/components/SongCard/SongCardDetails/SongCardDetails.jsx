import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'common/components/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import styled from 'styled-components';
import Card from 'common/components/MaterialCard';

const AvatarWrapper = styled.div`
  height: 25px;
  width: 25px;
`;

function SongCardDetails({ trackId, userId, userAvatar, title, username }) {
  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Card.Column>
      <Card.Row>
        <Card.Title to={trackUrl} title={title}>
          {title}
        </Card.Title>
      </Card.Row>
      <Card.Row>
        <Link to={userUrl} title={username}>
          <AvatarWrapper><Avatar src={userAvatar} /></AvatarWrapper>
        </Link>
        <Card.SubLink to={userUrl} title={username}>
          {username}
        </Card.SubLink>
      </Card.Row>
    </Card.Column>
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
