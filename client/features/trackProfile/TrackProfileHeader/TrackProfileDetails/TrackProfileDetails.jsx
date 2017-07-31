import React from 'react';
import PropTypes from 'prop-types';
import Title from 'common/components/Title';
import ColumnLayout from 'common/components/layouts/ColumnLayout';
import TrackUsername from './TrackUsername';
import TrackDescription from './TrackDescription';
import TrackActions from './TrackActions';

function TrackProfileDetails({ title, username, description, userRoute }) {
  return (
    <ColumnLayout width={800}>
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
    </ColumnLayout>
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
