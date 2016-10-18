import React, { PropTypes } from 'react';
import { NotificationManager } from 'react-notifications';
import MagicButton from 'client/components/MagicButton';

function createInfo(msg) {
  NotificationManager.info(msg);
}

const SongCardControls = ({
  handleLikeClick,
  handleUnlikeClick,
  isLiked,
  handleCopyToClipboard
}) => (
  <div className="song-card-controls">
    <MagicButton
      title={isLiked ? 'Unlike' : 'Like'}
      btnClassName="icon-button"
      iconClassName={`fa fa-heart ${isLiked && 'active'}`}
      onClick={isLiked ? handleUnlikeClick : handleLikeClick}
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

SongCardControls.propTypes = {
  isLiked: PropTypes.bool,
  handleLikeClick: PropTypes.func,
  handleUnlikeClick: PropTypes.func,
  handleCopyToClipboard: PropTypes.func
};

export default SongCardControls;
