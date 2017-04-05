import React, { PropTypes } from 'react';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/Hocs/InfiniteScroll';

const renderSongCardList = (trackIds) => {
  // We are using index + trackId as the key because sometimes it will have flattenChildren warning
  // issue when using replace to change url in router index.jsx
  return (
    <div className="song-card-list-container">
      {
        trackIds.map((trackId, index) => (
          <SongCardContainer trackId={trackId} trackIds={trackIds} key={index + trackId} />
        ))
      }
    </div>
  );
};

const SongCardList = (props) => {
  const { fetching, trackIds } = props;

  return (
    <div className="pad-bottom">
      {renderSongCardList(trackIds)}
      {fetching && <Spinner />}
    </div>
  );
};

SongCardList.defaultProps = {
  fetching: false,
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.array,
};

export default infiniteScroll(SongCardList);
