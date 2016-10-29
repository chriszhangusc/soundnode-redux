import React, { PropTypes } from 'react';
import chunk from 'lodash/chunk';
import SongCardContainer from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/hocs/InfiniteScroll';
import { List } from 'immutable';

const renderSongCardList = (trackIds) => {
  const COLS = 4;

  // Shallow convert Immutable.List to array for chunking
  // and preserving the goodness of Track Records
  const rows = chunk(trackIds.toArray(), COLS);
  return rows.map((rowItems, i) => (
    <div className="row" key={i} > {/* anti-pattern here ?*/}
      {
        rowItems.map(trackId => (
          <div className="col-sm-3" key={trackId}>
            <SongCardContainer trackId={trackId} trackIds={trackIds} />
          </div>
        ))
      }
    </div>
  ));
};

const SongCardList = (props) => {
  const { fetching, trackIds } = props;

  return (
    <div className="container pad-bottom">
      {renderSongCardList(trackIds)}
      { fetching && <Spinner /> }
    </div>
  );
};

SongCardList.defaultProps = {
  fetching: false,
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.instanceOf(List),
};

export default infiniteScroll(SongCardList);
