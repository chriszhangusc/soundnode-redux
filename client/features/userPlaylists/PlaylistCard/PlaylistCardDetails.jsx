import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';
import RouterLink from 'common/components/links/RouterLink';
import { connect } from 'react-redux';
import { getPlayQueueById, getUserByPlaylistId } from 'features/entities/entitiesSelectors';
import Card from 'common/components/Card';
import { truncateMaxWidth } from 'app/css/styleUtils';

const PlaylistTitle = RouterLink.extend`
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

const PlaylistSubtitle = RouterLink.extend`
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

function PlaylistCardDetails({ trackCount, duration, title, userAvatar, username }) {
  return (
    <Card.Column>
      <Card.Row>
        <PlaylistTitle to="#" title={title}>
          {title}
        </PlaylistTitle>
      </Card.Row>
      <Card.Row>
        <PlaylistSubtitle>
          <Card.InnerSpan>{trackCount} songs</Card.InnerSpan>
          <Card.InnerSpan>{duration}</Card.InnerSpan>
        </PlaylistSubtitle>
      </Card.Row>
      {/* <Card.Row>
        <RouterLink to="#" title={username}>
          <UserImage src={userAvatar} size="small" />
        </RouterLink>
        <RouterLink to="#" title={username}>
          {username}
        </RouterLink>
      </Card.Row> */}
    </Card.Column>
  );
}

PlaylistCardDetails.propTypes = {
  trackCount: PropTypes.number,
  duration: PropTypes.string,
  title: PropTypes.string,
  userAvatar: PropTypes.string,
  username: PropTypes.string,
};

function mapStateToProps(state, { playlistId }) {
  const playlist = getPlayQueueById(state, playlistId);
  const user = getUserByPlaylistId(state, playlistId);
  return {
    trackCount: playlist && playlist.trackCount,
    duration: '12:23',
    title: playlist && playlist.title,
    username: user && user.username,
    userAvatar: user && user.avatarUrl,
  };
}

export default connect(mapStateToProps)(PlaylistCardDetails);
