import React from 'react';
import PropTypes from 'prop-types';
import Title from 'common/components/Title';
import ColumnLayout from 'common/components/layouts/ColumnLayout';
import RouterLink from 'common/components/links/RouterLink';
import TrackDescription from './TrackDescription';
import TrackActions from './TrackActions';

const TrackUsername = RouterLink.extend`font-size: 1.5rem;`;

function TrackProfileDetails({ title, username, description, userRoute }) {
  return (
    <ColumnLayout width="800px">
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
