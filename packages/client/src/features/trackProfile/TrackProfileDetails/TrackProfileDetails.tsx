import * as React from 'react';
import * as PropTypes from 'prop-types';
import Heading from '@soundnode-redux/client/src/common/components/Heading';
import ColumnLayout from '@soundnode-redux/client/src/common/components/layouts/ColumnLayout';
import TrackUsername from './TrackUsername';
import TrackDescription from './TrackDescription';
import TrackActions from './TrackActions';

function TrackProfileDetails({ title, username, description, userRoute }) {
  return (
    <ColumnLayout width="800px">
      <Heading>{title}</Heading>
      <TrackUsername to={userRoute}>{username}</TrackUsername>
      <TrackDescription>{description}</TrackDescription>
      <TrackActions />
    </ColumnLayout>
  );
}

// TrackProfileDetails.defaultProps = {
//   userRoute: '',
//   title: '',
//   username: '',
//   description: '',
// };

// TrackProfileDetails.propTypes = {
//   userRoute: PropTypes.string,
//   title: PropTypes.string,
//   username: PropTypes.string,
//   description: PropTypes.string,
// };

export default TrackProfileDetails;
