import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Track from 'client/models/Track';
// import Artist from 'client/models/Artist';
// We should keep reducer simple!!!
import {
  isTrackActive,
  getTrackById,
  getArtistByTrackId
} from 'client/redux/modules/reducers';

import SongCardInfoContainer from './SongCardInfoContainer';
import SongCardControlsContainer from './SongCardControlsContainer';
import SongCardImageContainer from './SongCardImageContainer';


// Layout component just to assemble children presentational components.

// By doing this, there will be more useless rendering going in the subcomponent.
// For example if we like this song, its image info and controls components will
// all be re-rendered.
// Instead of having a top level container passing down props to its children,
// we need to connect each of the children component to a container.
// When the connected container is told to be re-rendered, it will check if the mapped
// object is shallowly equal or not.

const SongCardContainer = ({ track, active }) => {
  return (
    <div className={`card song-card ${(active ? 'active' : '')}`}>
      <SongCardImageContainer track={track} />
      <SongCardInfoContainer track={track} />
      <SongCardControlsContainer track={track} />
    </div>
  );
};

const mapStateToProps = (state, { trackId }) => {
  return {
    track: getTrackById(state, trackId),
    artist: getArtistByTrackId(state, trackId),
    active: isTrackActive(state, trackId)
  };
};

SongCardContainer.propTypes = {
  track: PropTypes.instanceOf(Track),
  active: PropTypes.bool
};

export default connect(mapStateToProps)(SongCardContainer);
