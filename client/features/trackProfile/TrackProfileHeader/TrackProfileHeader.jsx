import React from 'react';
import RowLayout from 'common/components/layouts/RowLayout';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';

function TrackProfileHeader() {
  return (
    <RowLayout>
      <TrackProfileImage />
      <TrackProfileDetails />
    </RowLayout>
  );
}

export default TrackProfileHeader;
