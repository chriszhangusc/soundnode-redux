import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import { getProfiledTrack } from 'features/trackProfile/trackProfileSelectors';
import TrackTitle from './TrackTitle';
import TrackUsername from './TrackUsername';
import TrackDescription from './TrackDescription';
import TrackButtonGroup from './TrackButtonGroup';

const ColumnWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: left; /* This is important or the children of this container would strech to have the full width of their parent */
  justify-content: flex-start;
`;

function TrackProfileDetails({ title, userId, username, description }) {
  return (
    <ColumnWrapper>
      <TrackTitle>
        {title}
      </TrackTitle>
      <TrackUsername to={`${USER_PROFILE_ROUTE}/${userId}`}>
        {username}
      </TrackUsername>
      <TrackDescription>
        {description}
      </TrackDescription>
      <TrackButtonGroup />
    </ColumnWrapper>
  );
}

TrackProfileDetails.propTypes = {
  userId: PropTypes.number,
  title: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
};

TrackProfileDetails.defaultProps = {
  userId: null,
  title: '',
  username: '',
  description: '',
};

function mapStateToProps(state) {
  const track = getProfiledTrack(state);
  // console.log(track);
  const user = track && getUserByTrackId(state, track.id);
  // console.log(user);
  return {
    userId: user && user.id,
    title: track && track.title,
    username: user && user.username,
    description: track && track.description,
  };
}

export default connect(mapStateToProps)(TrackProfileDetails);
