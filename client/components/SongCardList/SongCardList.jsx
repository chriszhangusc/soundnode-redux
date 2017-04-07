import React, { PropTypes } from 'react';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/Hocs/InfiniteScroll';

const renderSongCardList = (trackIds, playlistName) => {
  // We are using index + trackId as the key because sometimes it will have flattenChildren warning
  // issue when using replace to change url in router index.jsx
  return (
    <div className="song-card-list-container">
      {
        trackIds.map((trackId, index) => (
          <SongCardContainer trackId={trackId} trackIds={trackIds} playlistName={playlistName} key={index + trackId} />
        ))
      }
    </div>
  );
};

const SongCardList = (props) => {
  const { fetching, trackIds, playlistName } = props;

  return (
    <div className="pad-bottom">
      {renderSongCardList(trackIds, playlistName)}
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
  playlistName: PropTypes.string,
};

export default infiniteScroll(SongCardList);
