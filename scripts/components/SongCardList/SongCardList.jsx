import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/hocs/InfiniteScroll';
import TrackMap from 'client/models/TrackMap';
/**
 * Render SongCardList subroutine
 * @param  {Array of Track Records}  tracks     [description]
 * @param  {Boolean} isFetching [description]
 * @return {[type]}             [description]
 */
const renderSongCardList = (tracks, isFetching) => {
  if (isFetching) return <Spinner />;
  const COLS = 4;
  const rows = chunk(tracks, COLS);
  return rows.map((rowItems, i) => (
    <div className="row" key={i} >
      {
        rowItems.map(track => (<div className="col-sm-3" key={track.getId()}>
          <SongCardContainer track={track} />
        </div>))
      }
    </div>
  ));
};


const SongCardList = (props) => {
  const { isFetching, tracks } = props;
  return (
    <div className="container">
      {renderSongCardList(tracks, isFetching)}
    </div>
  );
};


SongCardList.propTypes = {
  isFetching: PropTypes.bool,
  tracks: PropTypes.arrayOf(TrackMap)
};

export default infiniteScroll(SongCardList);
