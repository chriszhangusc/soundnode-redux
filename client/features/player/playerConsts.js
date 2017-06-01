/* Player Action Types */
export const PLAYER_SONG_PLAY = 'PLAYER_SONG_PLAY';
export const PLAYER_SONG_PAUSE = 'PLAYER_SONG_PAUSE';
export const PLAYER_TIME_UPDATE = 'PLAYER_TIME_UPDATE';
export const PLAYER_SEEK_BEGIN = 'PLAYER_SEEK_BEGIN';
export const PLAYER_SEEK_END = 'PLAYER_SEEK_END';
export const PLAYER_VOLUME_CHANGE = 'PLAYER_VOLUME_CHANGE';
export const PLAYER_VOLUME_SEEK_BEGIN = 'PLAYER_VOLUME_SEEK_BEGIN';
export const PLAYER_VOLUME_SEEK_END = 'PLAYER_VOLUME_SEEK_END';
export const PLAYER_PLAY_MODE_CHANGE = 'PLAYER_PLAY_MODE_CHANGE';
export const PLAYER_MUTE = 'PLAYER_MUTE';
export const PLAYER_TIME_CLEAR = 'PLAYER_TIME_CLEAR';
export const PLAYER_SONG_CHANGE = 'PLAYER_SONG_CHANGE';

/* Constants */
export const LOOP = 'LOOP'; // Loop through the playlist, when it hits the end, start all over from the beginning
export const REPEAT = 'REPEAT'; // Repeat current song.
export const SHUFFLE = 'SHUFFLE'; // Shuffle playing, will not play songs that are played already.
export const DEFAULT_MODE = LOOP;
export const INITIAL_VOLUME = 0.5;
export const NEXT = 'NEXT';
export const PREV = 'PREV';
