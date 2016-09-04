import {UPDATE_TIME, PLAY_SONG, PAUSE_SONG, LOAD_PLAYLIST, TOGGLE_SEEK, CHANGE_SONG} from '../constants/ActionTypes';
import {getPrevSong, getNextSong} from '../utils/SongUtils';
import {SEQUENCIAL, LOOP, REPEAT, SHUFFLE} from '../constants/PlayerConstants'

export const handleSongEnded = () => {
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

export const toggleSeek = () => {
  return {
    type: TOGGLE_SEEK,
  };
}

export const updateTime = (currentTime) => {
  return {
    type: UPDATE_TIME,
    currentTime,
  };
};

export const handleTimeUpdate = (newTime) => {
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

export const handleSeekTimeUpdate = (newTime) => {
  return (dispatch, getState) => {
    const {player} = getState();
    // Do not update time normally if the user is playing with duration bar
    newTime = Math.floor(newTime);
    if (newTime !== player.currentTime) {
      dispatch(updateTime(newTime));
    }
  };
}

// This should be moved to util functions
const computeNewTimeOnSeek = (mouseEvent, seekBar, duration) => {

  let offset = mouseEvent.clientX - seekBar.offsetLeft;
  let width = seekBar.offsetWidth;
  if (offset < 0) offset = 0;
  else if (offset > width) offset = width;
  let percent = offset * 1.0 / width;
  return Math.floor(duration * percent);
};

/**
 * duration: song duration in seconds
 */
export const seek = (mouseEvent, seekBar, audioElement, shouldUpdatePlayer) => {
  return (dispatch, getState) => {
    const newTime = computeNewTimeOnSeek(mouseEvent, seekBar, audioElement.duration);
    // ONLY UPDATE currenttime in STATE!
    dispatch(handleSeekTimeUpdate(newTime));
    if (shouldUpdatePlayer) audioElement.currentTime = newTime;
  };
};


/**
 * Change current song in player to newSong
 */
export const changeSong = (newSong) => {
  return {
    type: CHANGE_SONG,
    song: newSong,
  };
};

/**
 * Toggle the playing status of currently playing song in player
 */
export const togglePlay = () => {
  return {
    type: TOGGLE_PLAY,
  }
}

export const changeSongAndPlay = (newSong, audioElement) => {
  return (dispatch, getState) => {
    dispatch(changeSong(newSong));
    dispatch(playSong());
    if (audioElement) audioElement.play();
  };
};

export const playSong = () => {
  return {
    type: PLAY_SONG,
  };
};

// Pause currently playing song
export const pauseSong = () => {
  return {
    type: PAUSE_SONG,
  };
};

export const loadPlaylist = (genre) => {
  return {
    type: LOAD_PLAYLIST,
    playlist: genre,
  };
};
