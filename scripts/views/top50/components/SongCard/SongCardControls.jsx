import React, { PropTypes } from 'react';

const SongCardControls = ({ handleLike, isLiked, handleCopyToClipboard }) => {
  return (
    <div className="song-card-controls">
      <button className="icon-button" onClick={handleLike}>
        <i className={`fa fa-heart ${isLiked ? 'active' : ''}`} />
      </button>
      <button className="icon-button">
        <i className="fa fa-bookmark" />
      </button>
      <button className="icon-button">
        <i className="fa fa-external-link" />
      </button>
      <button className="icon-button" onClick={handleCopyToClipboard}>
        <i className="fa fa-clipboard" />
      </button>
    </div>
  );
};

SongCardControls.propTypes = {
  isLiked: PropTypes.bool,
  handleLike: PropTypes.func,
  handleCopyToClipboard: PropTypes.func
};

export default SongCardControls;
