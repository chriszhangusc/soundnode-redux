import React, { Component } from 'react';
import VisibleSongCard from '../containers/VisibleSongCard';
import Spinner from './Spinner';
import infiniteScroll from './hocs/InfiniteScroll';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import chunk from 'lodash/chunk';

// <ReactCSSTransitionGroup
//   component="div"
//   transitionName="example"
//   transitionEnterTimeout={300}
//   transitionLeaveTimeout={300}>
//   {renderSongCards({...other})}
// </ReactCSSTransitionGroup>

const SongCardList = (props) => {
  const {isFetching, songs} = props;
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
  const result = rows.map((rowItems, i) => (
    <div className="songs-row grid" key={i} >
      {
        rowItems.map(song => (<div className="col-1-5 clearfix" key={song.id}>
          <VisibleSongCard song={song} />
        </div>))
      }
    </div>
  ));
  return result;
}

export default infiniteScroll(SongCardList);
