import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Comment = ({
  artistLinkUrl,
  defaultArtistImage,
  artistAvatarUrl,
  commentCreatedAt,
  artistName,
  commentBody
}) =>
(<li className="comment-item">
  <img
    className="song-card-user-image comment-artist-avatar"
    role="presentation"
    onError={(e) => {
      e.target.src = defaultArtistImage;
    }}
    src={artistAvatarUrl || defaultArtistImage}
  />
  <div>
    <div className="comment-header">
      <Link className="comment-artist-name" to={artistLinkUrl} >{artistName}</Link>
      <span className="comment-created-at">{commentCreatedAt}</span>
    </div>
    <p className="comment-body">
      {commentBody}
    </p>
  </div>
</li>);

Comment.propTypes = {
  artistLinkUrl: PropTypes.string,
  defaultArtistImage: PropTypes.string,
  artistAvatarUrl: PropTypes.string,
  commentCreatedAt: PropTypes.string,
  artistName: PropTypes.string,
  commentBody: PropTypes.string
};

export default Comment;
