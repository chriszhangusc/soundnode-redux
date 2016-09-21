import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCardContainer from '../containers/SongCardContainer';
import Spinner from './Spinner';
import infiniteScroll from './hocs/InfiniteScroll';

const SongCardList = (props) => {
  const { isFetching, songs } = props;
  return (
    <div className="container">
      <div className="content">
        {renderSongCardList(songs)}
        {isFetching ? <Spinner /> : null}
      </div>
    </div>
  );
}

const renderSongCardList = (songs) => {
  const COLS = 5;
  const rows = chunk(songs, COLS);
  return rows.map((rowItems, i) => (
    <div className="songs-row grid" key={i} >
      {
        rowItems.map(song => (<div className="col-1-5 clearfix" key={song.id}>
          <SongCardContainer song={song} />
        </div>))
      }
    </div>
  ));
};

SongCardList.propTypes = {
  isFetching: PropTypes.bool,
  songs: PropTypes.array
};

export default infiniteScroll(SongCardList);
