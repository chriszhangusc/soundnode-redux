import { connect } from 'react-redux';
import { isTrackActive, isTrackPlaying } from 'client/features/player/playerSelectors';
import { changeSongAndPlay, playSong, pauseSong } from 'client/features/player/playerActions';
import { switchPlaylistIfNeeded } from 'client/features/playlist/playlistActions';
import { getMiniVersion, getLargeVersion } from 'client/common/utils/imageUtils';
import SongCardImage from './SongCardImage';

const mapStateToProps = (state, { track }) => ({
  artworkUrl: getLargeVersion(track.artworkUrl),
  artworkUrlSmall: getMiniVersion(track.artworkUrl),
  active: isTrackActive(state, track.id),
  playing: isTrackPlaying(state, track.id),
});

// This is useful when you need to compute some action using stateProps
const mergeProps = (stateProps, { dispatch }, { track }) => ({
  ...stateProps,
  // Besides doing it this way, we could also do it in a thunk function
  // or pass all args into components and assemble there
  handleImageClick() {
    if (!stateProps.active) {
      dispatch(changeSongAndPlay(track.id));
      dispatch(switchPlaylistIfNeeded());
    } else {
      dispatch(stateProps.playing ? pauseSong() : playSong());
    }
  },
});

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
