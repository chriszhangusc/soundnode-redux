import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  getProfiledTrack,
  getCommentIds,
  isCommentsFetching,
} from 'client/features/trackProfile/trackProfileSelectors';
import { fetchMoreComments } from 'client/features/trackProfile/trackProfileActions';
import infiniteScroll from 'client/common/hocs/InfiniteScroll';
import Spinner from 'client/common/components/Spinner';
import TrackProfileComment from './TrackProfileComment';

const Title = styled.h3`
  margin: 25px 0;
`;

const CommentList = styled.ul`
`;

function TrackProfileComments({ commentCount, commentIds, commentsFetching }) {
  return (
    <div>
      <Title>{`Comments: (${commentCount})`}</Title>
      <CommentList>
        {commentIds.map(commentId => (
          <li key={commentId.toString()}>
            <TrackProfileComment commentId={commentId} />
          </li>
        ))}
      </CommentList>
      {commentsFetching && <Spinner />}
    </div>
  );
}

TrackProfileComments.defaultProps = {
  commentCount: 0,
  commentIds: [],
};

TrackProfileComments.propTypes = {
  commentCount: PropTypes.number,
  commentIds: PropTypes.arrayOf(PropTypes.number),
};

function mapStateToProps(state) {
  const track = getProfiledTrack(state);
  return {
    commentsFetching: isCommentsFetching(state),
    commentCount: track && track.commentCount,
    commentIds: getCommentIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      console.log('fetchMore');
      dispatch(fetchMoreComments());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(infiniteScroll(TrackProfileComments));
