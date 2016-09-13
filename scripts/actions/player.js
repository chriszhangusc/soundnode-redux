import * as ActionTypes from '../constants/ActionTypes';
import {LOOP, REPEAT, SHUFFLE, DEFAULT_MODE} from '../constants/PlayerConstants';
import {getPrevSong, getNextSong} from '../utils/SongUtils';
import {computeNewTimeOnSeek, computeNewVolumeOnSeek} from '../utils/PlayerUtils';

/* Pure actions */
export const toggleSeek = () => ({ type: ActionTypes.TOGGLE_SEEK })

export const beginSeek = () => ({ type: ActionTypes.BEGIN_SEEK })

export const endSeek = () => ({ type: ActionTypes.END_SEEK })
/**
 * Toggle the playing status of currently playing song in player
 */
export const togglePlay = () => ({ type: ActionTypes.TOGGLE_PLAY })

export const playSong = () => ({ type: ActionTypes.PLAY_SONG })
// Pause currently playing song
export const pauseSong = () => ({ type: ActionTypes.PAUSE_SONG })

export const beginVolumeSeek = () => ({ type: ActionTypes.BEGIN_VOLUME_SEEK })

export const endVolumeSeek = () => ({ type: ActionTypes.END_VOLUME_SEEK })

export const updateTime = (currentTime) => ({
  type: ActionTypes.UPDATE_TIME,
  currentTime
})

export const changeDuration = (duration) => ({
  type: ActionTypes.CHANGE_DURATION,
  duration
})
/**
 * Change current song in player to newSong
 */
export const changeSong = (newSongId) => ({
  type: ActionTypes.CHANGE_SONG,
  songId: newSongId,
})

export const loadPlaylist = (playlist) => ({
  type: ActionTypes.LOAD_PLAYLIST,
  playlist,
})

export const changeVolume = (volume) => ({
  type: ActionTypes.CHANGE_VOLUME,
  volume
})

export const switchMode = (mode) => ({
  type: ActionTypes.SWITCH_MODE,
  mode
})

/* Thunk actions */

export const toggleMute = () => {
  return (dispatch, getState) => {
    const currVolume = getState().player.volume;
    if (currVolume === 0) {
      // Get previous volume from localstorage
      let lastVolume = localStorage.getItem('lastVolume');

      dispatch(changeVolume(lastVolume));
    } else {
      // Put current volume into localstorage and change current volume to 0
      localStorage.setItem('lastVolume', currVolume);
      dispatch(changeVolume(0));
    }
  };
};

export const changePlayMode = (mode) => {
  return (dispatch, getState) => {
    const currMode = getState().player.mode;
    if (currMode === mode) {
      dispatch(switchMode(DEFAULT_MODE));
    } else {
      dispatch(switchMode(mode));
    }
  };
};
/**
 * Play next song according to current playing mode.
 */
export const playNextSong = () => {

  return (dispatch, getState) => {
    const {player, playlists} = getState();
    const genre = player.playlist;
    const currentSong = player.song;
    const playlistSongs = playlists[genre].songs;
    const mode = player.mode;
    const nextSong = getNextSong(currentSong, playlistSongs, mode);
    if (nextSong) dispatch(changeSongAndPlay(nextSong.id));
  };
};

export const playPrevSong = () => {
  return (dispatch, getState) => {
    const {player, playlists} = getState();
    const genre = player.playlist;
    const currentSong = player.song;
    const playlist = playlists[genre].songs;
    const prevSong = getPrevSong(currentSong, playlist);
    if (prevSong) dispatch(changeSongAndPlay(prevSong.id));

  };
};

export const onTimeUpdate = (newTime) => {
  return (dispatch, getState) => {
    const {player} = getState();
    // Do not update time normally if the user is playing with duration bar
    if (player.isSeeking) return ;

    newTime = Math.floor(newTime);
    if (newTime !== player.currentTime) {
      dispatch(updateTime(newTime));
    }

  };
};

export const onSeekTimeUpdate = (newTime) => {
  return (dispatch, getState) => {
    const {player} = getState();
    // Do not update time normally if the user is playing with duration bar
    newTime = Math.floor(newTime);
    if (newTime !== player.currentTime) {
      dispatch(updateTime(newTime));
    }
  };
};

/**
 * duration: song duration in seconds
 */
export const updateTimeOnSeek = (mouseEvent, seekBar, duration) => {
  return (dispatch, getState) => {
    let newTime = computeNewTimeOnSeek(mouseEvent, seekBar, duration);
    // ONLY UPDATE currenttime in STATE!
    dispatch(onSeekTimeUpdate(Math.floor(newTime)));
  };
};

export const updateVolumeOnSeek = (e, volumeBar) => {
  return (dispatch, getState) => {
    let newVolume = computeNewVolumeOnSeek(e, volumeBar);
    dispatch(changeVolume(newVolume));
  };
};

export const updateVolumeOnClick = (e, volumeBar) => {
  return (dispatch, getState) => {
    let newVolume = computeNewVolumeOnSeek(e, volumeBar);
    dispatch(changeVolume(newVolume));
  };
};

export const changePlaylistIfNeeded = (newPlaylistName) => {
  return (dispatch, getState) => {
    const currentPlaylistName = getState().player.playlist
    if (currentPlaylistName !== newPlaylistName) {
      dispatch(loadPlaylist(newPlaylistName));
    }
  };
};

// Switch player playlist if needed.
export const changeSongAndPlay = (newSongId) => {
  return (dispatch, getState) => {
    const visiblePlaylist = getState().visiblePlaylist;
    const playerPlaylist = getState().player.playlist;
    // Initialize player playlist if needed
    if (visiblePlaylist !== playerPlaylist)
      dispatch(loadPlaylist(visiblePlaylist));
    dispatch(changeSong(newSongId));
    dispatch(playSong());
  };
};

/**
 * Called in onEnded
 */
export const playNextSongByCurrentMode = () => {
  return (dispatch, getState) => {
    const currMode = getState().player.mode;
    switch (currMode) {
      case LOOP:
        dispatch(playNextSong());
        break;
      case REPEAT:
        break;
      case SHUFFLE:
        dispatch(playNextSong());
        break;
      default:
        break;
    }
  };
};
