import React, { PropTypes } from 'react';
import defaultArtistImage from 'assets/images/default-artist.png';
import Track from 'client/models/Track';
import CommentMap from 'client/models/CommentMap';

const CommentSection = ({ track, comments }) => {
  return (
    <div className="comments-container">
      <div className="comment-title">
        <h4>Comments: ({track.getCommentCount()})</h4>
      </div>
      <div className="comment-list-container">
        <ul className="comment-list">
          {comments.valueSeq().map(comment => (<li className="comment-item" key={comment.getId()}>
            <img
              className="song-card-user-image comment-artist-avatar"
              role="presentation"
              onError={(e) => {
                e.target.src = defaultArtistImage;
              }}
              src={comment.getArtist().getAvatarUrl() || defaultArtistImage}
            />
            <div>
              <div className="comment-header">
                <a className="comment-artist-name">{comment.getArtist().getUsername()}</a>
                <span className="comment-created-at">{comment.getCreatedAt()}</span>
              </div>
              <p className="comment-body">
                {comment.getCommentBody()}
              </p>
            </div>
          </li>))}
        </ul>
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  track: PropTypes.instanceOf(Track),
  comments: PropTypes.instanceOf(CommentMap)
};

export default CommentSection;
