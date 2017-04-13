import { connect } from 'react-redux';
import { isTrackActive, isTrackPlaying } from 'client/redux/modules/player/selectors';
import { changeSongAndPlay, playSong, pauseSong } from 'client/redux/modules/player/actions';
import { switchPlaylistIfNeeded } from 'client/redux/modules/playlist/actions';
import { getMiniVersion, getLargeVersion } from 'client/utils/ImageUtils';
import SongCardImage from '../components/SongCardImage';

const mapStateToProps = (state, { track }) => ({
  artworkUrl: getLargeVersion(track.artworkUrl),
  artworkUrlSmall: getMiniVersion(track.artworkUrl),
  active: isTrackActive(state, track.id),
  playing: isTrackPlaying(state, track.id),
});

// This is useful when you need to compute some action using stateProps
const mergeProps = (stateProps, { dispatch }, { track, playlistName }) => ({
  ...stateProps,
  // Besides doing it this way, we could also do it in a thunk function
  //  or pass all args into components and assemble there
  // #TODO: Fat container!! Move to redux thunk
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
