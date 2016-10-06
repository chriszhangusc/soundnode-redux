import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PlaylistItem = ({
  songId,
  title,
  username,
  isLiked,
  isActive,
  index,
  handleChangeSong,
  handleLikeSong,
  handleUnlikeSong
 }) => {
  return (
    <li
      className={`playlist-item ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isActive) handleChangeSong();
      }}
    >
      <span className="playlist-item-index">{`${index}.`}</span>
      <span className="playlist-item-title">{ title }</span>
      <span className="playlist-item-username">by: {username}</span>
      <div className="playlist-item-options-container">
        <i className="fa fa-ellipsis-v" />
        <div className="playlist-item-popup-arrow" />
        <ul className="playlist-item-options-list">
          <li className="playlist-item-options-list_button">Go to track</li>
          <li
            className="playlist-item-options-list_button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isLiked) {
                handleUnlikeSong();
              } else {
                handleLikeSong();
              }
            }}
          >{ isLiked ? 'Unlike' : 'Like' }</li>
          <li className="playlist-item-options-list_button">Add to playlist</li>
          <li className="playlist-item-options-list_button">Remove</li>
          <li className="playlist-item-options-list_button">Repost</li>
        </ul>
      </div>
    </li>
  );
};

PlaylistItem.propTypes = {
  handleChangeSong: PropTypes.func,
  handleLikeSong: PropTypes.func,
  handleUnlikeSong: PropTypes.func,
  title: PropTypes.string,
  username: PropTypes.string,
  isLiked: PropTypes.bool,
  isActive: PropTypes.bool,
  index: PropTypes.number
};

export default PlaylistItem;
