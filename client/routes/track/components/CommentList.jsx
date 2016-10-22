import React, { PropTypes } from 'react';
import { List } from 'immutable';
import CommentContainer from '../containers/CommentContainer';

const CommentList = ({ commentCount, commentIds }) => {
  return (
    <div className="comments-container">
      <div className="comment-title">
        <h4>Comments: ({commentCount})</h4>
      </div>
      <div className="comment-list-container">
        <ul className="comment-list">
          {
            commentIds.map(commentId => <CommentContainer key={commentId} commentId={commentId} />)
          }
        </ul>
      </div>
    </div>
  );
};

CommentList.propTypes = {
  commentCount: PropTypes.number,
  commentIds: PropTypes.instanceOf(List)
};

export default CommentList;
