import { connect } from 'react-redux';
import SongCard from '../components/SongCard';
import { pauseSong, changeSongAndPlay } from '../actions/player';
import * as selectors from '../selectors/songCardsSelectors';
import { formatImageUrl, formatTitle } from '../utils/FormatUtils';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = (state, {song}) => {
  return {
    imageUrl: formatImageUrl(song.artwork_url),
    title: formatTitle(song.title),
    userImage: song.user.avatar_url,
    username: song.user.username,
    isActive: selectors.getIsActive(state, song.id),
    visiblePlaylistName: selectors.getVisiblePlaylistName(state),
    isPlaying: selectors.getPlayingState(state),
    currentSong: selectors.getCurrentSong(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChangeSong() { dispatch(changeSongAndPlay(ownProps.song.id)); },
  handlePauseSong() { dispatch(pauseSong()); }
})

const VisibleSongCard = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default VisibleSongCard;
