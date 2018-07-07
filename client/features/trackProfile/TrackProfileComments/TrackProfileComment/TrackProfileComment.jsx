import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import { getSmallVersion } from 'common/utils/imageUtils';
import CommentUserAvatar from './CommentUserAvatar';
import CommentUsername from './CommentUsername';
import Wrapper from './Wrapper';
import CommentDetailWrapper from './CommentDetailWrapper';
import CommentHeaderWrapper from './CommentHeaderWrapper';
import CommentTimestamp from './CommentTimestamp';
import CommentBody from './CommentBody';

function TrackProfileComment({ comment }) {
  const { body, user, created_at } = comment;

  const { id, avatar_url, username } = user;

  const userLink = `${USER_PROFILE_ROUTE}/${id}`;

  return (
    <Wrapper>
      <CommentUserAvatar linkTo={userLink} userAvatarUrl={getSmallVersion(avatar_url)} />
      <CommentDetailWrapper>
        <CommentHeaderWrapper>
          <CommentUsername to={userLink}>{username}</CommentUsername>
          <CommentTimestamp>{created_at.replace('+0000', '')}</CommentTimestamp>
        </CommentHeaderWrapper>
        <CommentBody>{body}</CommentBody>
      </CommentDetailWrapper>
    </Wrapper>
  );
}

// function mapStateToProps(state, { commentId }) {
//   const comment = getCommentById(state, commentId);
//   const { body, createdAt } = comment;
//   const commentUser = getUserByCommentId(state, commentId);
//   const { username, id, avatarUrl } = commentUser;
//   return {
//     comment,
//     userAvatarUrl: getSmallVersion(avatarUrl),
//     username,
//     commentBody: body,
//     commentTimestamp: createdAt.replace('+0000', ''),
//     userId: id,
//   };
// }

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

export default TrackProfileComment;
