import React, { PropTypes } from 'react';
import { NotificationManager } from 'react-notifications';
import MagicButton from 'client/components/MagicButton';

function createInfo(msg) {
  NotificationManager.info(msg);
}

const SongCardControls = ({
  handleLikeClick,
  handleUnlikeClick,
  liked,
  handleCopyToClipboard
}) => {
  // console.log('Render: SongCardControls');
  return (
    <div className="song-card-controls">
      <MagicButton
        title={liked ? 'Unlike' : 'Like'}
        btnClassName="icon-button"
        iconClassName={`fa fa-heart ${liked && 'active'}`}
        onClick={liked ? handleUnlikeClick : handleLikeClick}
      />
      <MagicButton
        title="Add to playlist"
        btnClassName="icon-button"
        iconClassName="fa fa-bookmark"
        onClick={() => createInfo('Added to playlist')}
      />
      <MagicButton
        title="Repost"
        btnClassName="icon-button"
        iconClassName="fa fa-external-link"
        onClick={() => createInfo('Added to repose')}
      />
      <MagicButton
        title="Copy to clipboard"
        btnClassName="icon-button"
        iconClassName="fa fa-clipboard"
        onClick={handleCopyToClipboard}
      />
    </div>
  );
};

SongCardControls.propTypes = {
  liked: PropTypes.bool,
  handleLikeClick: PropTypes.func,
  handleUnlikeClick: PropTypes.func,
  handleCopyToClipboard: PropTypes.func
};

export default SongCardControls;
