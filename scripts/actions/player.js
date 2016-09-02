import {UPDATE_TIME, PLAY_SONG, PAUSE_SONG, LOAD_PLAYLIST} from '../constants/ActionTypes';
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


export const updateTime = (currentTime) => {
  return {
    type: UPDATE_TIME,
    currentTime,
  };
};

export const handleTimeUpdate = (e) => {
  return (dispatch, getState) => {

    const audioElement = e.target;
    const {player} = getState();

    let currentTime = Math.floor(audioElement.currentTime);
    let duration = Math.floor(audioElement.duration);

    if (currentTime !== player.currentTime) {
      dispatch(updateTime(currentTime));
    }

  };
};

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
