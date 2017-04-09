import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'client/components/Spinner';
// import Track from 'client/models/Track';
import TrackImageContainer from '../containers/TrackImageContainer';
import TrackInfoContainer from '../containers/TrackInfoContainer';
import CommentListContainer from '../containers/CommentListContainer';

const TrackDetailsLayout = ({
  track,
  trackFetching,
}) => {
  if (trackFetching) return <Spinner />;
  return (
    <div className="container">
      <div className="track-info-container">
        <TrackImageContainer track={track} />
        <TrackInfoContainer track={track} />
      </div>
      <CommentListContainer track={track} />
    </div>
  );
};
// {/*  */}

TrackDetailsLayout.propTypes = {
  track: PropTypes.object,
  trackFetching: PropTypes.bool,
};

export default TrackDetailsLayout;
