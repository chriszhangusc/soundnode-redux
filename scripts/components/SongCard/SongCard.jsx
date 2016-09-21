import React, { PropTypes } from 'react';
import SongCardImage from './SongCardImage';
import SongCardInfo from './SongCardInfo';

// Layout component just to assemble children presentational components.
const SongCard = props => (
  <div className={`card song-card ${(props.isActive ? 'active' : '')}`}>
    <SongCardImage {...props} />
    <SongCardInfo {...props} />
  </div>
);

SongCard.propTypes = {
  isActive: PropTypes.bool
};

export default SongCard;
