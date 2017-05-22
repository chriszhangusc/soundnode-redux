import React from 'react';

import PropTypes from 'prop-types';

function PlaylistRow({
  title,
  artistName,
  liked,
  active,
  index,
  handleChangeSong,
  handleLikeSong,
  handleUnlikeSong,
 }) {
  return (
    <li
      className={`playlist-item ${active ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active) handleChangeSong();
      }}
    >
      <span className="playlist-item-index">{`${index}.`}</span>
      <span className="playlist-item-title" title={title}>{title}</span>
      <span className="playlist-item-username" title={artistName}>by: {artistName}</span>
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
              if (liked) {
                handleUnlikeSong();
              } else {
                handleLikeSong();
              }
            }}
          >{liked ? 'Unlike' : 'Like'}</li>
          <li className="playlist-item-options-list_button">Add to playlist</li>
          <li className="playlist-item-options-list_button">Remove</li>
          <li className="playlist-item-options-list_button">Repost</li>
        </ul>
      </div>
    </li>
  );
}

PlaylistRow.propTypes = {
  handleChangeSong: PropTypes.func.isRequired,
  handleLikeSong: PropTypes.func.isRequired,
  handleUnlikeSong: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlaylistRow;
