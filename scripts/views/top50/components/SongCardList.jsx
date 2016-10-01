import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCardContainer from '../containers/SongCardContainer';
import Spinner from '../../common/components/Spinner';
import infiniteScroll from '../../common/components/hocs/InfiniteScroll';

const renderSongCardList = (songs) => {
  const COLS = 4;
  const rows = chunk(songs, COLS);
  return rows.map((rowItems, i) => (
    <div className="row" key={i} >
      {
        rowItems.map(song => (<div className="col-sm-3" key={song.id}>
          <SongCardContainer song={song} />
        </div>))
      }
    </div>
  ));
};


const SongCardList = (props) => {
  const { isFetching, songs } = props;
  return (
    <div className="container">
      {renderSongCardList(songs)}
      {isFetching ? <Spinner /> : null}
    </div>
  );
};


SongCardList.propTypes = {
  isFetching: PropTypes.bool,
  songs: PropTypes.arrayOf(PropTypes.shape({}))
};

export default infiniteScroll(SongCardList);
