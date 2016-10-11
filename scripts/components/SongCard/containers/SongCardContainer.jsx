import { connect } from 'react-redux';
import { COPY_SUCCESS } from 'client/constants/ActionTypes';
import copy from 'copy-to-clipboard';
import { formatImageUrl } from 'client/utils/FormatUtils';

import {
  playSong,
  changeSongAndPlay,
  pauseSong
} from 'client/modules/player/actions';
import { startLikeSong, startUnlikeSong } from 'client/modules/user/actions';

// We should keep reducer simple!!!
import {
  isSongLiked,
  getSingleSongIsActive,
  getSingleSongPlayingState
} from 'client/modules/reducers';

import SongCard from '../components/SongCard';


const mapStateToProps = (state, { track }) => {
  const trackId = track.getId();
  const trackArtist = track.getArtist();
  return {
    // This is just like passing down props!
    trackId,
    artist: trackArtist,
    isLiked: isSongLiked(state, trackId),
    isActive: getSingleSongIsActive(state, trackId),
    isPlaying: getSingleSongPlayingState(state, trackId),
    artworkUrl: formatImageUrl(track.getArtworkUrl()),
    title: track.getTitle(),
    userAvatar: trackArtist.getAvatarUrl(),
    artistName: trackArtist.getUsername()
  };
};

const mapDispatchToProps = (dispatch, { track }) => {
  const trackId = track.getId();
  return {
    // Fire if the user click on a song card that is active
    handlePlaySong() { dispatch(playSong()); },
    // Fire if the user click on a song card that is not active
    handleChangeSong() { dispatch(changeSongAndPlay(track, true)); },
    handlePauseSong() { dispatch(pauseSong()); },
    handleLikeClick() {
      dispatch(startLikeSong(trackId));
    },
    handleUnlikeClick() {
      dispatch(startUnlikeSong(trackId));
    },
    handleCopyToClipboard() {
      copy(track.getPermalinkUrl());
      dispatch({
        type: COPY_SUCCESS,
        payload: {
          message: 'Track URL copied to clipboard'
        }
      });
    }
  };
};

const SongCardContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCard);

export default SongCardContainer;
