import React from 'react';
import PropTypes from 'prop-types';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/Hocs/InfiniteScroll';
import shortid from 'shortid';

const renderSongCardList = (trackIds, playlistName) => {
  return (
    <div className="song-card-list-container">
      {
        trackIds.map(trackId => (
          <SongCardContainer
            trackId={trackId}
            trackIds={trackIds}
            playlistName={playlistName}
            key={shortid.generate()}
          />
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
  playlistName: '',
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.array.isRequired,
  playlistName: PropTypes.string,
};

export default infiniteScroll(SongCardList);
