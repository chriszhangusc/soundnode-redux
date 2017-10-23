import React from 'react';
import PropTypes from 'prop-types';
import Card from 'common/components/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavoriteTrackIds, getReposts, isLoggedIn } from 'features/auth/authSelectors';
import * as authActions from 'features/auth/authActions';
import * as copyActions from 'features/copy/copyActions';
import { showModal } from 'features/modals/modalsActions';
import { authRequired } from 'features/notification/notificationActions';

function SongCardActions({ authed, trackId, track, liked, reposted, permalinkUrl, actions }) {
  const handleCopyClick = () => {
    actions.copyToClipboard(
      permalinkUrl,
      'Permalink copied to clipboard',
      'Permalink failed to copy to clipboard',
    );
  };

  const handleLikeClick = () => {
    if (!authed) {
      actions.authRequired();
    } else {
      const toggleAction = liked ? actions.doUnlikeTrack : actions.doLikeTrack;
      toggleAction(trackId);
    }
  };

  const handleAddToPlaylistClick = () => {
    if (!authed) {
      actions.authRequired();
    } else {
      actions.showModal('ADD_TO_PLAYLIST', {
        track,
      });
    }
  };

  const handleRepostClick = () => {
    if (!authed) {
      actions.authRequired();
    } else {
      const toggleRepost = reposted ? actions.removeRepost : actions.createRepost;
      toggleRepost(trackId);
    }
  };

  return (
    <Card.Row>
      <Card.IconButton
        tooltipText={liked ? 'Unlike' : 'Like'}
        iconName="heart"
        active={liked}
        onClick={handleLikeClick}
      />
      <Card.IconButton
        tooltipText="Add to playlist"
        iconName="bookmark"
        onClick={handleAddToPlaylistClick}
      />
      <Card.IconButton
        tooltipText="Repost"
        iconName="retweet"
        active={reposted}
        onClick={handleRepostClick}
      />
      <Card.IconButton
        tooltipText="Copy permalink"
        iconName="clipboard"
        onClick={handleCopyClick}
      />
    </Card.Row>
  );
}

function mapStateToProps(state, { track }) {
  const { id, permalinkUrl } = track;
  const favoriteTrackIds = getFavoriteTrackIds(state);
  const reposts = getReposts(state);
  return {
    trackId: id,
    permalinkUrl,
    liked: favoriteTrackIds.includes(id),
    reposted: reposts.includes(id),
    authed: isLoggedIn(state),
  };
}

const actions = {
  ...authActions,
  ...copyActions,
  showModal,
  authRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(SongCardActions);

/* Prop validations */

const propTypes = {
  track: PropTypes.object.isRequired,
};

const injectedProps = {
  trackId: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  reposted: PropTypes.bool.isRequired,
  permalinkUrl: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

SongCardActions.propTypes = {
  ...injectedProps,
  ...propTypes,
};

Connected.propTypes = propTypes;

export default Connected;
