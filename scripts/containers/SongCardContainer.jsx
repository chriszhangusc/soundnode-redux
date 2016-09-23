import { connect } from 'react-redux';
import SongCard from '../components/SongCard/SongCard';
import actions from '../actions';

import {
  getSongImage,
  getSongTitle,
  getSongUserAvatar,
  getSongUsername,
  getSingleSongIsActive,
  getSingleSongPlayingState
} from '../selectors/songCardSelectors';

const mapStateToProps = (state, { song }) => ({
  // This is just like passing down props!
  songImage: getSongImage(song),
  title: getSongTitle(song),
  userImage: getSongUserAvatar(song),
  username: getSongUsername(song),
  isActive: getSingleSongIsActive(state, song.id),
  isPlaying: getSingleSongPlayingState(state, song.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Fire if the user click on a song card that is active
  handlePlaySong() { dispatch(actions.playSong()); },
  // Fire if the user click on a song card that is not active
  handleChangeSong() { dispatch(actions.changeSongAndPlay(ownProps.song.id)); },
  handlePauseSong() { dispatch(actions.pauseSong()); }
});

const SongCardContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default SongCardContainer;
