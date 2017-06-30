import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'common/components/images/Avatar';
import { Link } from 'react-router-dom';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'app/css/colors';
import { connect } from 'react-redux';
import { getPlaylistById, getUserByPlaylistId } from 'features/entities/entitiesSelectors';
import Card from 'common/components/MaterialCard';

const AvatarWrapper = styled.div`
  height: 25px;
  width: 25px;
`;

function PlaylistCardDetails({ trackCount, duration, title, userAvatar, username }) {
  // const trackUrl = `${TRACK_PROFILE_ROUTE}/${trackId}`;
  // const userUrl = `${USER_PROFILE_ROUTE}/${userId}`;
  return (
    <Card.Column>
      <Card.Row>
        <Card.Title to="#" title={title}>
          {title}
        </Card.Title>
      </Card.Row>
      <Card.Row>
        <Card.Subtitle>
          <Card.InnerSpan>{trackCount} songs</Card.InnerSpan>
          <Card.InnerSpan>•</Card.InnerSpan>
          <Card.InnerSpan>{duration}</Card.InnerSpan>
        </Card.Subtitle>
      </Card.Row>
      <Card.Row>
        <Link to="#" title={username}>
          <AvatarWrapper><Avatar src={userAvatar} /></AvatarWrapper>
        </Link>
        <Card.SubLink to="#" title={username}>
          {username}
        </Card.SubLink>
      </Card.Row>
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
  const playlist = getPlaylistById(state, playlistId);
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
