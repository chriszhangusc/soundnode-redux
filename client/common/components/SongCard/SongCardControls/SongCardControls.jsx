import React from 'react';
import PropTypes from 'prop-types';
import Card from 'common/components/MaterialCard';

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

export default SongCardControls;
