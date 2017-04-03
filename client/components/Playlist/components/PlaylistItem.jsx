import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

const PlaylistItem = ({
  title,
  artistName,
  liked,
  active,
  index,
  handleChangeSong,
  handleLikeSong,
  handleUnlikeSong,
 }) => (
    <li
      className={`playlist-item ${active ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active) handleChangeSong();
      }}
    >
      <span className="playlist-item-index">{`${index}.`}</span>
      <span className="playlist-item-title">{title}</span>
      <span className="playlist-item-username">by: {artistName}</span>
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

PlaylistItem.propTypes = {
  handleChangeSong: PropTypes.func,
  handleLikeSong: PropTypes.func,
  handleUnlikeSong: PropTypes.func,
  // trackId: PropTypes.number,
  title: PropTypes.string,
  artistName: PropTypes.string,
  liked: PropTypes.bool,
  active: PropTypes.bool,
  index: PropTypes.number,
};

export default PlaylistItem;
