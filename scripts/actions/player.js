import {UPDATE_TIME, PLAY_SONG, PAUSE_SONG, LOAD_PLAYLIST, TOGGLE_SEEK} from '../constants/ActionTypes';
import {getPrevSong, getNextSong} from '../utils/SongUtils';

export const playNextSong = () => {
  return (dispatch, getState) => {

    const {player, playlists} = getState();

    const genre = player.playlist;
    const currentSong = player.song;
    const playlist = playlists[genre].songs;
    const nextSong = getNextSong(currentSong, playlist);
    if (nextSong) dispatch(playSong(nextSong));

  };
};

export const playPrevSong = () => {
  return (dispatch, getState) => {

    const {player, playlists} = getState();

    const genre = player.playlist;
    const currentSong = player.song;
    const playlist = playlists[genre].songs;
    const nextSong = getPrevSong(currentSong, playlist);
    if (nextSong) dispatch(playSong(nextSong));

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

export const playSong = (song) => {
  return {
    type: PLAY_SONG,
    song: song,
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
