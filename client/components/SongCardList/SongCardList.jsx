import React, { PropTypes } from 'react';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/hocs/InfiniteScroll';
import { List } from 'immutable';

const renderSongCardList = (trackIds) => {
  // We are using index + trackId as the key because sometimes it will have flattenChildren warning
  // issue when using replace to change url in router index.jsx
  return (
    <div className="row">
      {
        trackIds.toArray().map((trackId, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index + trackId}>
            <SongCardContainer trackId={trackId} trackIds={trackIds} />
          </div>
        ))
      }
    </div>
  );
};

const SongCardList = (props) => {
  const { fetching, trackIds } = props;

  return (
    <div className="container pad-bottom">
      {renderSongCardList(trackIds)}
      { fetching && <Spinner /> }
    </div>
  );
};

SongCardList.defaultProps = {
  fetching: false,
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.instanceOf(List),
};

export default infiniteScroll(SongCardList);
