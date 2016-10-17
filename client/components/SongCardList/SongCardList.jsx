import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/hocs/InfiniteScroll';
import TrackMap from 'client/models/TrackMap';

const renderSongCardList = (tracks, isFetching) => {
  if (isFetching) return <Spinner />;
  const tracksArray = tracks.toArray();
  const COLS = 4;
  const rows = chunk(tracksArray, COLS);
  return rows.map((rowItems, i) => (
    <div className="row" key={i} >
      {
        rowItems.map(track => (<div className="col-sm-3" key={track.getId()}>
          <SongCardContainer track={track} playlist={tracks} />
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
  tracks: PropTypes.instanceOf(TrackMap)
};

export default infiniteScroll(SongCardList);
