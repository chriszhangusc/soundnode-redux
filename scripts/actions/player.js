import * as ActionTypes from '../constants/ActionTypes';
import {LOOP, REPEAT, SHUFFLE, DEFAULT_MODE} from '../constants/PlayerConstants';
import {getPrevSong, getNextSong} from '../utils/SongUtils';
import {computeNewTimeOnSeek, computeNewVolumeOnSeek} from '../utils/PlayerUtils';

/* Pure functions */
export const toggleSeek = () => {
  return {
    type: ActionTypes.TOGGLE_SEEK,
  };
}

export const beginSeek = () => {
  return {
    type: ActionTypes.BEGIN_SEEK,
  };
};

export const endSeek = () => {
  return {
    type: ActionTypes.END_SEEK,
  };
};

export const updateTime = (currentTime) => {
  return {
    type: ActionTypes.UPDATE_TIME,
    currentTime,
  };
};

export const changeDuration = (duration) => {
  return {
    type: ActionTypes.CHANGE_DURATION,
    duration,
  }
};

/**
 * Change current song in player to newSong
 */
export const changeSong = (newSong) => {
  return {
    type: ActionTypes.CHANGE_SONG,
    song: newSong,
  };
};

/**
 * Toggle the playing status of currently playing song in player
 */
export const togglePlay = () => {
  return {
    type: ActionTypes.TOGGLE_PLAY,
  }
}

export const playSong = () => {
  return {
    type: ActionTypes.PLAY_SONG,
  };
};

// Pause currently playing song
export const pauseSong = () => {
  return {
    type: ActionTypes.PAUSE_SONG,
  };
};

export const loadPlaylist = (genre) => {
  return {
    type: ActionTypes.LOAD_PLAYLIST,
    playlist: genre,
  };
};

export const changeVolume = (volume) => {
  return {
    type: ActionTypes.CHANGE_VOLUME,
    volume,
  };
};


export const beginVolumeSeek = () => {
  return {
    type: ActionTypes.BEGIN_VOLUME_SEEK,
  };
};

export const endVolumeSeek = () => {
  return {
    type: ActionTypes.END_VOLUME_SEEK,
  };
};

export const switchMode = (mode) => {
  return {
    type: ActionTypes.SWITCH_MODE,
    mode,
  }
}

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

/* Thunk Functions */

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


export const onEnded = () => {
  return (dispatch, getState) => {
    const {player, playlists} = getState();
    switch (player.mode) {
      case SEQUENCIAL:
        dispatch(playNextSong());
    }
  };
};

export const playNextSong = () => {
  return (dispatch, getState) => {
    const {player, playlists} = getState();
    const genre = player.playlist;
    const currentSong = player.song;
    const playlist = playlists[genre].songs;
    const nextSong = getNextSong(currentSong, playlist);
    if (nextSong) dispatch(changeSongAndPlay(nextSong));
  };
};

export const playPrevSong = () => {
  return (dispatch, getState) => {
    const {player, playlists} = getState();
    const genre = player.playlist;
    const currentSong = player.song;
    const playlist = playlists[genre].songs;
    const prevSong = getPrevSong(currentSong, playlist);
    if (prevSong) dispatch(changeSongAndPlay(prevSong));

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

export const changeSongAndPlay = (newSong) => {
  return (dispatch, getState) => {
    dispatch(changeSong(newSong));
    dispatch(playSong());
  };
};
