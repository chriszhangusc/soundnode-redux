import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from 'client/common/components/Avatar';
import { connect } from 'react-redux';
import { getCommentById, getUserByCommentId } from 'client/features/entities/entitiesSelectors';
import { getSmallVersion } from 'client/common/utils/imageUtils';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 15px 0;
  max-height: 50px;
  & img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentBody = styled.p`
  font-size: 0.8rem;
  margin: 5px 0 0 0;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentUsername = styled.span`
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.85rem;
  font-weight: 700;
`;

const CommentTimestamp = styled.span`
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.8rem;
`;

function TrackProfileComment({ commentBody, username, commentTimestamp, userAvatarUrl }) {
  return (
    <Wrapper>
      <Avatar src={userAvatarUrl} />
      <CommentWrapper>
        <CommentHeader>
          <CommentUsername>{username}</CommentUsername>
          <CommentTimestamp>{commentTimestamp}</CommentTimestamp>
        </CommentHeader>
        <CommentBody>{commentBody}</CommentBody>
      </CommentWrapper>
    </Wrapper>
  );
}

function mapStateToProps(state, { commentId }) {
  const comment = getCommentById(state, commentId);
  const user = getUserByCommentId(state, commentId);
  // console.log(comment);
  // console.log(user);
  return {
    userAvatarUrl: user && getSmallVersion(user.avatarUrl),
    username: user && user.username,
    commentBody: comment && comment.body,
    commentTimestamp: comment && comment.createdAt.replace('+0000', ''),
  };
}

export default connect(mapStateToProps)(TrackProfileComment);
