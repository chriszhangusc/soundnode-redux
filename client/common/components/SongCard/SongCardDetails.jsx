import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'common/components/images/Avatar';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import Card from 'common/components/MaterialCard';
import { connect } from 'react-redux';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';

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
        <Avatar linkTo={userUrl} src={userAvatar} />
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

function mapStateToProps(state, { track }) {
  const user = getUserByTrackId(state, track.id);
  return {
    trackId: track.id,
    title: track.title,
    userAvatar: user.avatarUrl,
    username: user.username,
    userId: user.id,
  };
}

export default connect(mapStateToProps)(SongCardDetails);
