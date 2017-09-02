import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import { connect } from 'react-redux';
import { getCommentById, getUserByCommentId } from 'features/entities/entitiesSelectors';
import { getSmallVersion } from 'common/utils/imageUtils';
import CommentUserAvatar from './CommentUserAvatar';
import CommentUsername from './CommentUsername';
import Wrapper from './Wrapper';
import CommentDetailWrapper from './CommentDetailWrapper';
import CommentHeaderWrapper from './CommentHeaderWrapper';
import CommentTimestamp from './CommentTimestamp';
import CommentBody from './CommentBody';

function TrackProfileComment({ commentBody, userId, username, commentTimestamp, userAvatarUrl }) {
  const userLink = `${USER_PROFILE_ROUTE}/${userId}`;

  return (
    <Wrapper>
      <CommentUserAvatar linkTo={userLink} userAvatarUrl={userAvatarUrl} />
      <CommentDetailWrapper>
        <CommentHeaderWrapper>
          <CommentUsername to={userLink}>
            {username}
          </CommentUsername>
          <CommentTimestamp>
            {commentTimestamp}
          </CommentTimestamp>
        </CommentHeaderWrapper>
        <CommentBody>
          {commentBody}
        </CommentBody>
      </CommentDetailWrapper>
    </Wrapper>
  );
}

function mapStateToProps(state, { commentId }) {
  const comment = getCommentById(state, commentId);
  const { body, createdAt } = comment;
  const commentUser = getUserByCommentId(state, commentId);
  const { username, id, avatarUrl } = commentUser;
  return {
    comment,
    userAvatarUrl: getSmallVersion(avatarUrl),
    username,
    commentBody: body,
    commentTimestamp: createdAt.replace('+0000', ''),
    userId: id,
  };
}

TrackProfileComment.defaultProps = {
  userAvatarUrl: '',
  username: '',
  commentBody: '',
  commentTimestamp: '',
  userId: null,
};

TrackProfileComment.propTypes = {
  userAvatarUrl: PropTypes.string,
  username: PropTypes.string,
  commentBody: PropTypes.string,
  commentTimestamp: PropTypes.string,
  userId: PropTypes.number,
};

export default connect(mapStateToProps)(TrackProfileComment);
