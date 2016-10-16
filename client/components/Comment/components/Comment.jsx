import React, { PropTypes } from 'react';

const Comment = ({
  artistAvatar,
  artistName,
  createAt,
  commentBody
}) => {
  return (
    <li className="comment-item">
      <img role="presentation" src={artistAvatar} />
      <div className="comment-header">
        <a className="comment-artist-name">{artistName}</a>
        <span className="comment-created-at">{createAt}</span>
      </div>
      <p className="comment-body">{commentBody}</p>
    </li>
  );
};

Comment.propTypes = {
  artistAvatar: PropTypes.string,
  artistName: PropTypes.string,
  createAt: PropTypes.string,
  commentBody: PropTypes.string
};

export default Comment;
