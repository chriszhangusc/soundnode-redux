import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfiledTrack } from 'features/trackProfile/trackProfileSelectors';
import TrackProfileCommentList from './TrackProfileCommentList';

const Title = styled.h3`
  margin: 25px 0;
`;

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
  const track = getProfiledTrack(state);
  return {
    commentCount: track && track.commentCount,
  };
}

export default connect(mapStateToProps)(TrackProfileComments);
