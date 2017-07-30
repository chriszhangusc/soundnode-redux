import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiledTrackCommentCount } from 'features/trackProfile/trackProfileSelectors';
import Title from 'common/components/Title';
import TrackProfileCommentList from './TrackProfileCommentList';

function TrackProfileComments({ commentCount }) {
  return (
    <div>
      <Title>{`Comments: (${commentCount})`}</Title>
      <TrackProfileCommentList />
    </div>
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
