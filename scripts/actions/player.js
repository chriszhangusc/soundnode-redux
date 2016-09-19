import * as ActionTypes from '../constants/ActionTypes';
import { DEFAULT_MODE, NEXT, PREV} from '../constants/PlayerConstants';
import { getSongIdByMode } from '../utils/SongUtils';
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

export const loadPlayerPlaylist = (playlist) => ({
  type: ActionTypes.LOAD_PLAYER_PLAYLIST,
  payload: playlist
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



export const onRegularTimeUpdate = (newTime) => {
  return {
    type: ActionTypes.UPDATE_TIME_ON_PLAY,
    payload: newTime
  };
};

export const onSeekTimeUpdate = (newTime) => {
  return {
    type: ActionTypes.UPDATE_TIME_ON_SEEK,
    payload: newTime
  }
}

// Saga action
export const updateTimeAndEndSeek = (newTime) => {
  return {
    type: ActionTypes.UPDATE_TIME_AND_END_SEEK,
    payload: newTime
  };
};

export const updateVolumeAndEndSeek = (newVolume) => {
  return {
    type: ActionTypes.UPDATE_VOLUME_AND_END_SEEK,
    payload: newVolume
  }
}
