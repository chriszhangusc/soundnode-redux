import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Heading from '@soundnode-redux/client/src/common/components/Heading';
import TrackProfileCommentList from './TrackProfileCommentList';

function TrackProfileComments({ trackId, commentCount, comments }) {
  return (
    <Fragment>
      <Heading>{`Comments: (${commentCount})`}</Heading>
      <TrackProfileCommentList comments={comments} />
    </Fragment>
  );
}

TrackProfileComments.defaultProps = {
  commentCount: 0,
};

TrackProfileComments.propTypes = {
  commentCount: PropTypes.number,
};

export default TrackProfileComments;
