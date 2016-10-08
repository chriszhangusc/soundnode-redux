import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCard from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/hocs/InfiniteScroll';

const renderSongCardList = (songs, isFetching) => {
  if (isFetching) return <Spinner />;
  const COLS = 4;
  const rows = chunk(songs, COLS);
  return rows.map((rowItems, i) => (
    <div className="row" key={i} >
      {
        rowItems.map(song => (<div className="col-sm-3" key={song.id}>
          <SongCard song={song} />
        </div>))
      }
    </div>
  ));
};


const SongCardList = (props) => {
  const { isFetching, songs } = props;
  return (
    <div className="container">
      {renderSongCardList(songs, isFetching)}
    </div>
  );
};


SongCardList.propTypes = {
  isFetching: PropTypes.bool,
  songs: PropTypes.arrayOf(PropTypes.shape({}))
};

export default infiniteScroll(SongCardList);
