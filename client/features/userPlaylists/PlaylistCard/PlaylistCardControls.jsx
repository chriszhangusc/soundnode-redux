import React from 'react';
import PropTypes from 'prop-types';
import Card from 'common/components/MaterialCard';

function PlaylistCardControls({
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

PlaylistCardControls.propTypes = {
  liked: PropTypes.bool,
  reposted: PropTypes.bool,
  handleToggleLike: PropTypes.func,
  handleRepost: PropTypes.func,
  handleCopyToClipboard: PropTypes.func,
};

export default PlaylistCardControls;
