import { connect } from 'react-redux';
import SongCard from '../components/SongCard/SongCard';
import { pauseSong, playSong, changeSongAndPlay } from '../actions/player';
import * as selectors from '../selectors/songCardsSelectors';
import { formatImageUrl, formatTitle } from '../utils/FormatUtils';

const mapStateToProps = (state, { song }) => ({
  songImage: formatImageUrl(song.artwork_url),
  title: formatTitle(song.title),
  userImage: song.user.avatar_url,
  username: song.user.username,
  isActive: selectors.getIsActive(state, song.id),
  visiblePlaylistName: selectors.getVisiblePlaylistName(state),
  isPlaying: selectors.getPlayingState(state),
  currentSong: selectors.getCurrentSong(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Fire if the user click on a song card that is active
  handlePlaySong() { dispatch(playSong()); },
  // Fire if the user click on a song card that is not active
  handleChangeSong() { dispatch(changeSongAndPlay(ownProps.song.id)); },
  handlePauseSong() { dispatch(pauseSong()); }
});

const SongCardContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default SongCardContainer;
