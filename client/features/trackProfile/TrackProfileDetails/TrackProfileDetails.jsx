import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import { getProfiledTrack } from '../trackProfileSelectors';
import TrackTitle from './TrackTitle';
import TrackUsername from './TrackUsername';
import TrackCoverImage from './TrackCoverImage';
import TrackDescription from './TrackDescription';

const Wrapper = styled.div`
  display: flex;
`;

const ColumnWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
`;

function TrackProfileDetails({ title, username, description }) {
  return (
    <Wrapper>
      <TrackCoverImage />
      <ColumnWrapper>
        <TrackTitle>{ title }</TrackTitle>
        <TrackUsername>{ username }</TrackUsername>
        <TrackDescription>{ description }</TrackDescription>
      </ColumnWrapper>
    </Wrapper>
  );
}

TrackProfileDetails.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
};

TrackProfileDetails.defaultProps = {
  title: '',
  username: '',
  description: '',
};

function mapStateToProps(state) {
  const track = getProfiledTrack(state);
console.log(track);
  const user = track && getUserByTrackId(state, track.id);
  // console.log(user);
  return {
    title: track && track.title,
    username: user && user.username,
  };
}

export default connect(mapStateToProps)(TrackProfileDetails);
