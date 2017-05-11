/* Player Action Types */
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const UPDATE_TIME = 'UPDATE_TIME';
export const BEGIN_SEEK = 'BEGIN_SEEK';
export const END_SEEK = 'END_SEEK';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const BEGIN_VOLUME_SEEK = 'BEGIN_VOLUME_SEEK';
export const END_VOLUME_SEEK = 'END_VOLUME_SEEK';
export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';
export const CHANGE_VISIBLE_PLAYLIST = 'CHANGE_VISIBLE_PLAYLIST';
export const MUTE = 'MUTE';
export const CLEAR_TIME = 'CLEAR_TIME';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const CHANGE_SONG = 'CHANGE_SONG';

/* Constants */
export const LOOP = 'LOOP'; // Loop through the playlist, when it hits the end, start all over from the beginning
export const REPEAT = 'REPEAT'; // Repeat current song.
export const SHUFFLE = 'SHUFFLE'; // Shuffle playing, will not play songs that are played already.
export const DEFAULT_MODE = LOOP;
export const INITIAL_VOLUME = 0.5;
export const NEXT = 'NEXT';
export const PREV = 'PREV';
