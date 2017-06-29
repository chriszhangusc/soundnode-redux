import React from 'react';
import PropTypes from 'prop-types';
import Card from 'common/components/MaterialCard';
import { connect } from 'react-redux';
import { getFavoriteTrackIds, getReposts } from 'features/auth/authSelectors';
import { doLikeTrack, doUnlikeTrack, createRepost, removeRepost } from 'features/auth/authActions';
import { copyToClipboard } from 'features/copy';

function SongCardControls({
  liked,
  reposted,
  handleToggleLike,
  handleRepost,
  handleCopyToClipboard,
}) {
  return (
    <Card.Row>
      <Card.IconButton
        tooltipText={liked ? 'Unlike' : 'Like'}
        name="heart"
        active={liked}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleLike();
        }}
      />
      <Card.IconButton tooltipText="Add to playlist" name="bookmark" onClick={() => {}} />
      <Card.IconButton
        tooltipText="Repost"
        name="retweet"
        active={reposted}
        onClick={(e) => {
          e.stopPropagation();
          handleRepost();
        }}
      />
      <Card.IconButton
        tooltipText="Copy permalink"
        name="clipboard"
        onClick={handleCopyToClipboard}
      />
    </Card.Row>
  );
}

SongCardControls.propTypes = {
  liked: PropTypes.bool.isRequired,
  reposted: PropTypes.bool.isRequired,
  handleToggleLike: PropTypes.func.isRequired,
  handleRepost: PropTypes.func.isRequired,
  handleCopyToClipboard: PropTypes.func.isRequired,
};

function mapStateToProps(state, { track }) {
  const trackId = track.id;
  const favoriteTrackIds = getFavoriteTrackIds(state);
  const reposts = getReposts(state);
  return {
    liked: favoriteTrackIds.includes(trackId),
    reposted: reposts.includes(trackId),
  };
}

function mergeProps(props, { dispatch }, { track }) {
  const { liked, reposted } = props;
  return {
    ...props,
    handleToggleLike() {
      // Check sign in status
      const toggleLike = liked ? doUnlikeTrack : doLikeTrack;
      dispatch(toggleLike(track.id));
    },
    handleRepost() {
      const toggleRepost = reposted ? removeRepost : createRepost;
      dispatch(toggleRepost(track.id));
    },
    handleCopyToClipboard() {
      dispatch(
        copyToClipboard(
          track.permalinkUrl,
          'Permalink copied to clipboard',
          'Permalink failed to copy to clipboard',
        ),
      );
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(SongCardControls);
