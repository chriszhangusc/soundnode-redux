import React, { PropTypes } from 'react';
import Spinner from 'client/components/Spinner';
// import Track from 'client/models/Track';
import { Map } from 'immutable';
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
  track: PropTypes.instanceOf(Map),
  trackFetching: PropTypes.bool,
};

export default TrackDetailsLayout;
