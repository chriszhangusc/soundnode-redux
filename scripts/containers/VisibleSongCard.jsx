import React from 'react';
import { connect } from 'react-redux';
import SongCard from '../components/SongCard';
import { pauseSong, changeSongAndPlay } from '../actions/player';
import * as selectors from '../selectors/songCardsSelectors';
import { formatImageUrl } from '../utils/FormatUtils';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = (state, ownProps) => {
  return {
    imageUrl: formatImageUrl(ownProps.song.artwork_url),
    isActive: selectors.getIsActive(state, ownProps.song.id),
    visiblePlaylistName: selectors.getVisiblePlaylistName(state),
    isPlaying: selectors.getPlayingState(state),
    currentSong: selectors.getCurrentSong(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleChangeSong (newSongId) { dispatch(changeSongAndPlay(newSongId)); },
  handlePauseSong () { dispatch(pauseSong()); },
})

const VisibleSongCard = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default VisibleSongCard;
