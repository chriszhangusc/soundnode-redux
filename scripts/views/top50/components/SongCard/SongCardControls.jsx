import React, { PropTypes } from 'react';
import { NotificationManager } from 'react-notifications';

function createInfo(msg) {
  NotificationManager.info(msg);
}

const SongCardControls = ({ handleLikeClick, isLiked, handleCopyToClipboard }) => (
  <div className="song-card-controls">
    <button title="like" className="icon-button" onClick={handleLikeClick}>
      <i className={`fa fa-heart ${isLiked ? 'active' : ''}`} />
    </button>
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
    <button title="copy to clipboard" className="icon-button" onClick={handleCopyToClipboard}>
      <i className="fa fa-clipboard" />
    </button>
  </div>
);

SongCardControls.propTypes = {
  isLiked: PropTypes.bool,
  handleLikeClick: PropTypes.func,
  handleCopyToClipboard: PropTypes.func
};

export default SongCardControls;
