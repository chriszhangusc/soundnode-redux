import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'common/components/Title';
import TrackUsername from './TrackUsername';
import TrackDescription from './TrackDescription';
import TrackActions from './TrackActions';

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

function TrackProfileDetails({ title, username, description, userRoute }) {
  return (
    <ColumnWrapper>
      <Title>
        {title}
      </Title>
      <TrackUsername to={userRoute}>
        {username}
      </TrackUsername>
      <TrackDescription>
        {description}
      </TrackDescription>
      <TrackActions />
    </ColumnWrapper>
  );
}

TrackProfileDetails.propTypes = {
  userRoute: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
};

TrackProfileDetails.defaultProps = {
  userRoute: '',
  title: '',
  username: '',
  description: '',
};

export default TrackProfileDetails;
