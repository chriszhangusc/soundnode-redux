import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiledTrackCommentCount } from '@soundnode-redux/client/src/features/trackProfile/trackProfileSelectors';
import Heading from '@soundnode-redux/client/src/common/components/Heading';
import TrackProfileCommentList from './TrackProfileCommentList';

function TrackProfileComments({ trackId, commentCount, comments }) {
  return (
    <Fragment>
      <Heading>{`Comments: (${commentCount})`}</Heading>
      <TrackProfileCommentList comments={comments} trackId={trackId} />
    </Fragment>
  );
}

TrackProfileComments.defaultProps = {
  commentCount: 0,
};

TrackProfileComments.propTypes = {
  commentCount: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    commentCount: getProfiledTrackCommentCount(state),
  };
}

export default connect(mapStateToProps)(TrackProfileComments);
