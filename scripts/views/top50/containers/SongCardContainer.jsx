import { connect } from 'react-redux';
import SongCard from '../components/SongCard/SongCard';
import {
  playSong,
  sagaChangeSongAndPlay,
  pauseSong,
} from '../../../modules/playlists/actions';

import { startLikeSong } from '../../../modules/user/actions';

import {
  getSongImage,
  getSongTitle,
  getSongUserAvatar,
  getSongUsername,
  getSingleSongIsActive,
  getSingleSongPlayingState
} from '../../../selectors/songCardSelectors';

import { isSongLiked } from '../../../modules/reducers';

const mapStateToProps = (state, { song }) => ({
  // This is just like passing down props!
  isLiked: isSongLiked(state, song.id),
  songImage: getSongImage(song),
  title: getSongTitle(song),
  userImage: getSongUserAvatar(song),
  username: getSongUsername(song),
  isActive: getSingleSongIsActive(state, song.id),
  isPlaying: getSingleSongPlayingState(state, song.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Fire if the user click on a song card that is active
  handlePlaySong() { dispatch(playSong()); },
  // Fire if the user click on a song card that is not active
  handleChangeSong() { dispatch(sagaChangeSongAndPlay(ownProps.song)); },
  handlePauseSong() { dispatch(pauseSong()); },
  handleLike() {
    dispatch(startLikeSong(ownProps.song.id));
  },
  handleImageNotFound(description) {
    console.log('Image not found', description);
  }
});

const SongCardContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default SongCardContainer;
