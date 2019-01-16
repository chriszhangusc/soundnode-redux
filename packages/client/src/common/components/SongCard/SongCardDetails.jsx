import React from 'react';
import PropTypes from 'prop-types';
import UserImage from '@soundnode-redux/client/src/common/components/images/UserImage';
import {
  USER_PROFILE_ROUTE,
  TRACK_PROFILE_ROUTE,
} from '@soundnode-redux/client/src/common/constants/routeConsts';
import Card from '@soundnode-redux/client/src/common/components/Card';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import { truncateMaxWidth } from '@soundnode-redux/client/src/app/css/styleUtils';

const Title = RouterLink.extend`
  display: -webkit-box;
  font-size: 1.05rem;
  font-weight: bold;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
  &:hover {
    color: ${props => props.theme.colors.fontColor};
  }
`;

const Subtitle = RouterLink.extend`
  margin-left: 10px;
  color: ${props => props.theme.colors.fontColorSub};
  line-height: 32px; /* Vertical align!! It should be equal to the height of avatar */
  max-height: 32px;
  font-size: 0.9rem;
  ${truncateMaxWidth('160px')};
  &:hover {
    color: ${props => props.theme.colors.fontColor};
  }
`;

function SongCardDetails({ track }) {
  const {
    id: trackId,
    title,
    user: { id: userId, avatarUrl, username },
  } = track;

  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Card.Column>
      <Card.Row>
        <Title to={trackUrl} title={title}>
          {title}
        </Title>
      </Card.Row>
      <Card.Row>
        <UserImage linkTo={userUrl} src={avatarUrl} size="tiny" />
        <Subtitle to={userUrl} title={username}>
          {username}
        </Subtitle>
      </Card.Row>
    </Card.Column>
  );
}

SongCardDetails.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatarUrl: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default SongCardDetails;
