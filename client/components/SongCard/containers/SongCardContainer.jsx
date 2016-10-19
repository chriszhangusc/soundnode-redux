import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Track from 'client/models/Track';

// We should keep reducer simple!!!
import {
  isTrackActive,
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

const SongCardContainer = props => (
  <div className={`card song-card ${(props.active ? 'active' : '')}`}>
    <SongCardImageContainer track={props.track} />
    <SongCardInfoContainer track={props.track} />
    <SongCardControlsContainer track={props.track} />
  </div>
);

const mapStateToProps = (state, { track }) => {
  return {
    active: isTrackActive(state, track.getId())
  };
};

SongCardContainer.propTypes = {
  track: PropTypes.instanceOf(Track),
  active: PropTypes.bool
};

export default connect(mapStateToProps)(SongCardContainer);
