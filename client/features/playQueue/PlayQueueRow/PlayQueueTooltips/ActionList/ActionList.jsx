import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouterLink from 'common/components/links/RouterLink';
import { TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';
import * as authActions from 'features/auth/authActions';
import * as playQueueActions from 'features/playQueue/playQueueActions';
import { getFavoriteTrackIds, getReposts } from 'features/auth/authSelectors';

import Wrapper from './Wrapper';
import ActionListWrapper from './ActionListWrapper';
import ActionListItem from './ActionListItem';

function ActionList({ trackId, liked, reposted, actions }) {
  const handleLike = (e) => {
    e.stopPropagation();
    const { doUnlikeTrack, doLikeTrack } = actions;
    const toggleAction = liked ? doUnlikeTrack : doLikeTrack;
    toggleAction(trackId);
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    console.log('Add to playlist feature not yet implemented');
  };

  const handleRepost = (e) => {
    e.stopPropagation();
    const { createRepost, removeRepost } = actions;
    const toggleRepost = reposted ? removeRepost : createRepost;
    toggleRepost(trackId);
  };

  const handleGoToTrack = (e) => {
    e.stopPropagation();
    console.log('Go To Track');
  };

  const handleRemoveFromPlayQueue = (e) => {
    const { removeTrackFromPlayQueueAndPlayer } = actions;
    e.stopPropagation();
    console.log('Remove from playlist');
    removeTrackFromPlayQueueAndPlayer(trackId);
  };

  return (
    <Wrapper>
      <ActionListWrapper>
        <ActionListItem onClick={handleRemoveFromPlayQueue} first>
          Remove
        </ActionListItem>
        <ActionListItem onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</ActionListItem>
        <ActionListItem onClick={handleRepost}>
          {reposted ? 'Remove Repost' : 'Repost'}
        </ActionListItem>
        <ActionListItem onClick={handleAddToPlaylist}>Add to playlist</ActionListItem>
        <ActionListItem last>
          <RouterLink to={`${TRACK_PROFILE_ROUTE}/${trackId}`} onClick={handleGoToTrack}>
            Go to track
          </RouterLink>
        </ActionListItem>
      </ActionListWrapper>
    </Wrapper>
  );
}

const injectedProps = {};

const propTypes = {
  trackId: PropTypes.number.isRequired,
};

function mapStateToProps(state, { trackId }) {
  const favoriteTrackIds = getFavoriteTrackIds(state);
  const reposts = getReposts(state);
  return {
    liked: favoriteTrackIds.includes(trackId),
    reposted: reposts.includes(trackId),
  };
}

const actions = {
  ...authActions,
  ...playQueueActions,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(ActionList);

Connected.propTypes = propTypes;

ActionList.propTypes = {
  ...injectedProps,
  ...propTypes,
};

export default Connected;
