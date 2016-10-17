import React, { PropTypes } from 'react';
import { NotificationManager } from 'react-notifications';
import LikeButton from 'client/components/LikeButton';

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
    <LikeButton
      btnClassName="icon-button"
      isLiked={isLiked}
      onClick={isLiked ? handleUnlikeClick : handleLikeClick}
    />
    <button
      title="Add to playlist"
      className="icon-button"
      onClick={() => createInfo('Added to playlist')}
    >
      <i className="fa fa-bookmark" />
    </button>
    <button title="repost" className="icon-button">
      <i className="fa fa-external-link" />
    </button>
    <button
      title="Copy to clipboard"
      className="icon-button"
      onClick={handleCopyToClipboard}
    >
      <i className="fa fa-clipboard" />
    </button>
  </div>
);

SongCardControls.propTypes = {
  isLiked: PropTypes.bool,
  handleLikeClick: PropTypes.func,
  handleUnlikeClick: PropTypes.func,
  handleCopyToClipboard: PropTypes.func
};

export default SongCardControls;
