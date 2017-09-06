import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrackById, getUserByTrackId } from 'features/entities/entitiesSelectors';
import { isTrackActive } from 'features/player/playerSelectors';
import { updateActiveTrackIdAndPlay, togglePlaybackState } from 'features/player/playerActions';
import Wrapper from './Wrapper';
import PlayQueueTooltips from './PlayQueueTooltips';
import PlayQueueItemTitle from './PlayQueueItemTitle';
import PlayQueueItemArtistName from './PlayQueueItemArtistName';

function PlayQueueRow({ title, artistName, trackId, active, index, handleItemClick }) {
  return (
    <Wrapper
      active={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active) handleItemClick(trackId);
      }}
    >
      <PlayQueueItemTitle title={title}>{`${index}. ${title}`}</PlayQueueItemTitle>
      <PlayQueueItemArtistName title={artistName}>by: {artistName}</PlayQueueItemArtistName>
      <PlayQueueTooltips index={index} trackId={trackId} />
    </Wrapper>
  );
}

PlayQueueRow.propTypes = {
  trackId: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

function mapStateToProps(state, { trackId, index }) {
  const track = getTrackById(state, trackId);
  const artist = getUserByTrackId(state, trackId);
  return {
    index,
    trackId,
    active: isTrackActive(state, trackId),
    title: track.title,
    artistName: artist.username,
  };
}

export default connect(mapStateToProps, { handleItemClick: togglePlaybackState })(PlayQueueRow);
