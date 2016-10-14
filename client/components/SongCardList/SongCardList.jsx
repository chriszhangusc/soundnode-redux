import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/hocs/InfiniteScroll';
import TrackMap from 'client/models/TrackMap';
/**
 * Render SongCardList subroutine
 * @param  {Track Map}  tracksMap     [description]
 * @param  {Boolean} isFetching [description]
 * @return {[type]}             [description]
 */
const renderSongCardList = (trackMap, isFetching) => {
  if (isFetching) return <Spinner />;
  const tracksArray = trackMap.toArray();
  const COLS = 4;
  const rows = chunk(tracksArray, COLS);
  return rows.map((rowItems, i) => (
    <div className="row" key={i} >
      {
        rowItems.map(track => (<div className="col-sm-3" key={track.getId()}>
          <SongCardContainer track={track} playlist={trackMap} />
        </div>))
      }
    </div>
  ));
};


const SongCardList = (props) => {
  const { isFetching, trackMap } = props;
  return (
    <div className="container">
      {renderSongCardList(trackMap, isFetching)}
    </div>
  );
};


SongCardList.propTypes = {
  isFetching: PropTypes.bool,
  trackMap: PropTypes.instanceOf(TrackMap)
};

export default infiniteScroll(SongCardList);
