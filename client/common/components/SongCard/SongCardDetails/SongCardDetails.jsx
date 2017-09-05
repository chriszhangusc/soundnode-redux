import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import Card from 'common/components/Card';
import { connect } from 'react-redux';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';
import SongCardTitle from './SongCardTitle';
import SongCardSubTitle from './SongCardSubTitle';

function SongCardDetails({ trackId, userId, userAvatar, title, username }) {
  const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Card.Column>
      <Card.Row>
        <SongCardTitle to={trackUrl} title={title}>
          {title}
        </SongCardTitle>
      </Card.Row>
      <Card.Row>
        <UserImage linkTo={userUrl} src={userAvatar} size="small" />
        <SongCardSubTitle to={userUrl} title={username}>
          {username}
        </SongCardSubTitle>
      </Card.Row>
    </Card.Column>
  );
}

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

const Connected = connect(mapStateToProps)(SongCardDetails);

const propTypes = {
  track: PropTypes.object.isRequired,
};

const injectedPropsTypes = {
  trackId: PropTypes.number.isRequired,
  userAvatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

SongCardDetails.propTypes = {
  ...injectedPropsTypes,
  ...propTypes,
};

Connected.propTypes = propTypes;

export default Connected;
