import * as ActionTypes from '../constants/ActionTypes';
import { DEFAULT_MODE, NEXT, PREV} from '../constants/PlayerConstants';
import { getSongIdByMode } from '../utils/SongUtils';
import {computeNewTimeOnSeek, computeNewVolumeOnSeek} from '../utils/PlayerUtils';
import * as selectors from '../reducers';
/* Pure actions */
export const toggleSeek = () => ({ type: ActionTypes.TOGGLE_SEEK })

export const beginSeek = () => ({ type: ActionTypes.BEGIN_SEEK })

export const endSeek = () => ({ type: ActionTypes.END_SEEK })

export const playSong = () => ({ type: ActionTypes.PLAY_SONG })

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

export const changeSong = (newSongId) => ({
  type: ActionTypes.CHANGE_SONG,
  songId: newSongId
})

export const loadPlaylist = (playlist) => ({
  type: ActionTypes.LOAD_PLAYLIST,
  playlist
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

// Play next song in the player playlist by current mode
export const playNextSong = () => {
  return (dispatch, getState) => {
    const state = getState();
    const mode = selectors.getPlayerMode(state);
    const playlistSongIds = selectors.getPlayerSongIds(state);
    const currentSongId = selectors.getCurrentSongId(state);
    const nextSongId = getSongIdByMode(currentSongId, playlistSongIds, mode, NEXT);
    dispatch(changeSongAndPlay(nextSongId));
  };
};

export const playPrevSong = () => {
  return (dispatch, getState) => {
    const state = getState();
    const mode = selectors.getPlayerMode(state);
    const playlistSongIds = selectors.getPlayerSongIds(state);
    const currentSongId = selectors.getCurrentSongId(state);
    const prevSongId = getSongIdByMode(currentSongId, playlistSongIds, mode, PREV);
    dispatch(changeSongAndPlay(prevSongId));
  };
};

export const onTimeUpdate = (newTime) => {
  return (dispatch, getState) => {
    const {player} = getState();
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

export const updateTimeOnSeek = (seekBar, duration, mouseEvent) => {
  return (dispatch) => {
    let newTime = computeNewTimeOnSeek(mouseEvent, seekBar, duration);
    dispatch(onSeekTimeUpdate(newTime));
  };
};

export const updateTimeAndEndSeeking = (seekBar, duration, mouseEvent) => {
  return (dispatch) => {
    let newTime = computeNewTimeOnSeek(mouseEvent, seekBar, duration);
    dispatch(onSeekTimeUpdate(newTime));
    dispatch(endSeek());
  };
};

export const updateVolumeOnSeek = (e, volumeBar) => {
  return (dispatch) => {
    let newVolume = computeNewVolumeOnSeek(e, volumeBar);
    dispatch(changeVolume(newVolume));
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
