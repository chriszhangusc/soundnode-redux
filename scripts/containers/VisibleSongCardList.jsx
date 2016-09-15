import React from 'react';
import { connect } from 'react-redux';
import { fetchSongsOnScroll } from '../actions/playlists';
import { pauseSong, changeSongAndPlay } from '../actions/player';
import SongCardList from '../components/SongCardList';
import Spinner from '../components/Spinner';
import * as selectors from '../selectors/songCardsSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = (state) => ({
  isFetching: selectors.getFetchState(state),
  songs: selectors.getVisibleSongsAsArray(state), // may break on search
})

const mapDispatchToProps = (dispatch) => ({
  scrollFunc () { dispatch(fetchSongsOnScroll()); }
})

const VisibleSongCardList = connect(mapStateToProps,
  mapDispatchToProps)(SongCardList);

export default VisibleSongCardList;
