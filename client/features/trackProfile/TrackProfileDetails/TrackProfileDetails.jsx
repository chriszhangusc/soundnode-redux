import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import { getProfiledTrack } from '../trackProfileSelectors';
import TrackTitle from './TrackTitle';
import TrackUsername from './TrackUsername';
import TrackDescription from './TrackDescription';
import TrackButtonGroup from './TrackButtonGroup';

const ColumnWrapper = styled.div`
  position: relative;
  width: 800px;
  margin-left: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
`;

function TrackProfileDetails({ title, username, description }) {
  return (
    <ColumnWrapper>
      <TrackTitle>{title}</TrackTitle>
      <TrackUsername>{username}</TrackUsername>
      <TrackDescription>{description}</TrackDescription>
      <TrackButtonGroup />
    </ColumnWrapper>
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
    description: track && track.description,
  };
}

export default connect(mapStateToProps)(TrackProfileDetails);
