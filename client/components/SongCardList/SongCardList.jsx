import React from 'react';
import PropTypes from 'prop-types';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/Hocs/InfiniteScroll';
import shortid from 'shortid';
import styles from './SongCardList.css';

function renderSongCardList(trackIds, playlistName) {
  return (
    <div className={styles.songCardListContainer}>
      {trackIds.map(trackId => (
        <SongCardContainer
          trackId={trackId}
          trackIds={trackIds}
          playlistName={playlistName}
          key={shortid.generate()}
        />
      ))}
    </div>
  );
}

function SongCardList(props) {
  const { fetching, trackIds, playlistName } = props;

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
