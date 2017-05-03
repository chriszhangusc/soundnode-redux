import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/Hocs/InfiniteScroll';
import styles from './SongCardList.css';

function renderSongCardList(trackIds, playlistName) {
  return (
    <div className={styles.songCardListContainer}>
      {trackIds.map(trackId => (
        <SongCard
          trackId={trackId}
          playlistName={playlistName}
          key={trackId.toString()}
        />
      ))}
    </div>
  );
}

function SongCardList({ fetching, trackIds, playlistName }) {
  return (
    <div className="pad-bottom">
      {renderSongCardList(trackIds, playlistName)}
      {fetching && <Spinner />}
    </div>
  );
}

SongCardList.defaultProps = {
  fetching: false,
  playlistName: '',
  trackIds: [],
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.arrayOf(PropTypes.number),
  playlistName: PropTypes.string,
};

export default infiniteScroll(SongCardList);
