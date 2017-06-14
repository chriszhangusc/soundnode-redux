import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  getCommentIds,
  isCommentsFetching,
} from 'client/features/trackProfile/trackProfileSelectors';
import withFetchingOnScroll from 'client/common/hocs/withFetchingOnScroll';
import withLoadingSpinnerAfter from 'client/common/hocs/withLoadingSpinnerAfter';
import { loadMoreComments } from 'client/features/trackProfile/trackProfileActions';

import TrackProfileComment from '../TrackProfileComment';

const CommentList = styled.ul`
`;

function TrackProfileCommentList({ commentIds }) {
  return (
    <CommentList>
      {commentIds.map(commentId => (
        <li key={commentId.toString()}>
          <TrackProfileComment commentId={commentId} />
        </li>
      ))}
    </CommentList>
  );
}

TrackProfileCommentList.propTypes = {
  commentIds: PropTypes.arrayOf(PropTypes.number),
};

function mapStateToProps(state) {
  return {
    fetching: isCommentsFetching(state),
    commentIds: getCommentIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      dispatch(loadMoreComments());
    },
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFetchingOnScroll,
  withLoadingSpinnerAfter,
)(TrackProfileCommentList);
