import { connect } from 'react-redux';
import { formatImageUrl } from 'client/utils/FormatUtils';

import {
  isTrackActive,
  isTrackPlaying,
} from 'client/redux/modules/player/selectors';

import {
  changeSongAndPlay,
  playSong,
  pauseSong,
} from 'client/redux/modules/player/actions';

import {
  // changeActivePlaylistName,
  // updateShufflePlaylistIfNeeded,
  switchPlaylistIfNeeded,
} from 'client/redux/modules/playlist/actions';

import SongCardImage from '../components/SongCardImage';

const mapStateToProps = (state, { track }) => ({
  artworkUrl: formatImageUrl(track.artworkUrl),
  active: isTrackActive(state, track.id),
  playing: isTrackPlaying(state, track.id),
});

// This is useful when you need to compute some action using stateProps
const mergeProps = (stateProps, { dispatch }, { track, playlistName }) => ({
  ...stateProps,
  // Besides doing it this way, we could also do it in a thunk function
  //  or pass all args into components and assemble there
  handleImageClick() {
    if (!stateProps.active) {
      // Update activePlaylist name!
      // If playlistName is different with activePlaylistName,
      // which means we need to switch to new playlist
      dispatch(changeSongAndPlay(track.id));
      dispatch(switchPlaylistIfNeeded(playlistName));
    } else {
      dispatch(stateProps.playing ? pauseSong() : playSong());
    }
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
