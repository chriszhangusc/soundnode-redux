import React from 'react';
import SplitPane from 'common/components/layouts/SplitPane';
import TrackProfileDetails from './TrackProfileDetails';
import TrackProfileImage from './TrackProfileImage';

function TrackProfileHeader() {
  return <SplitPane left={<TrackProfileImage />} right={<TrackProfileDetails />} />;
}

export default TrackProfileHeader;
