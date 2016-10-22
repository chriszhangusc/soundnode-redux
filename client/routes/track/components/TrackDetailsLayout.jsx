import React, { PropTypes } from 'react';
import Spinner from 'client/components/Spinner';
import Track from 'client/models/Track';
import TrackImageContainer from '../containers/TrackImageContainer';
import TrackInfoContainer from '../containers/TrackInfoContainer';
import CommentListContainer from '../containers/CommentListContainer';

const TrackDetailsLayout = ({
  track,
  trackFetching,
  commentsFetching
}) => {
  if (trackFetching) return <Spinner />;
  return (
    <div className="container">
      <div className="track-info-container">
        <TrackImageContainer track={track} />
        <TrackInfoContainer track={track} />
      </div>
      { commentsFetching || <CommentListContainer track={track} /> }
    </div>
  );
};
// {/*  */}

TrackDetailsLayout.propTypes = {
  track: PropTypes.instanceOf(Track),
  trackFetching: PropTypes.bool,
  commentsFetching: PropTypes.bool
};

export default TrackDetailsLayout;
