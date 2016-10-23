/* UI */
export const UI_START_FETCHING = 'UI_START_FETCHING';
export const UI_END_FETCHING = 'UI_END_FETCHING';
/* Playlist Action Types */

export const INIT_PLAYLIST = 'INIT_PLAYLIST';
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
export const TOGGLE_PLAYLIST = 'TOGGLE_PLAYLIST';

/* COPY Actions */
export const COPY_SUCCESS = 'COPY_SUCCESS';
/* Player Action Types */
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const UPDATE_TIME = 'UPDATE_TIME';
export const LOAD_PLAYER_PLAYLIST = 'LOAD_PLAYER_PLAYLIST';

export const CHANGE_SONG = 'CHANGE_SONG';
export const BEGIN_SEEK = 'BEGIN_SEEK';
export const END_SEEK = 'END_SEEK';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const BEGIN_VOLUME_SEEK = 'BEGIN_VOLUME_SEEK';
export const END_VOLUME_SEEK = 'END_VOLUME_SEEK';
export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';
export const CHANGE_VISIBLE_PLAYLIST = 'CHANGE_VISIBLE_PLAYLIST';

/* Player Saga Action Types*/
export const SAGA_CHANGE_SONG_AND_PLAY = 'SAGA_CHANGE_SONG_AND_PLAY';
export const SAGA_UPDATE_TIME_ON_PLAY = 'SAGA_UPDATE_TIME_ON_PLAY';
export const SAGA_UPDATE_TIME_ON_SEEK = 'SAGA_UPDATE_TIME_ON_SEEK';
export const SAGA_UPDATE_TIME_AND_END_SEEK = 'SAGA_UPDATE_TIME_AND_END_SEEK';
export const SAGA_UPDATE_VOLUME_AND_END_SEEK = 'SAGA_UPDATE_VOLUME_AND_END_SEEK';
export const SAGA_TOGGLE_MUTE = 'SAGA_TOGGLE_MUTE';

export const SAGA_PLAY_NEXT_SONG = 'SAGA_PLAY_NEXT_SONG';
export const SAGA_PLAY_PREV_SONG = 'SAGA_PLAY_PREV_SONG';
export const SAGA_CHANGE_PLAY_MODE = 'SAGA_CHANGE_PLAY_MODE';

export const MUTE = 'MUTE';
export const CLEAR_TIME = 'CLEAR_TIME';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const INIT_SHUFFLE = 'INIT_SHUFFLE';
export const SHUFFLE_DRAW = 'SHUFFLE_DRAW';
export const SHUFFLE_DISCARD = 'SHUFFLE_DISCARD';

/* User Action Types */
export const LIKE_SONG_SUCCESS = 'LIKE_SONG_SUCCESS';
export const LIKE_SONG_FAILED = 'LIKE_SONG_FAILED';
export const UNLIKE_SONG_SUCCESS = 'UNLIKE_SONG_SUCCESS';
export const UNLIKE_SONG_FAILED = 'UNLIKE_SONG_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOAD_ALL_LIKES = 'LOAD_ALL_LIKES';

/* Search Action Types */
export const SAGA_DROPDOWN_SEARCH = 'SAGA_DROPDOWN_SEARCH';
export const SAGA_SEARCH = 'SAGA_SEARCH';

export const START_SEARCH = 'START_SEARCH';
export const SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED';

// Dropdown search
export const START_DROPDOWN_SEARCH = 'START_DROPDOWN_SEARCH';
export const SEARCH_DROPDOWN_ARTISTS_RECEIVED = 'SEARCH_DROPDOWN_ARTISTS_RECEIVED';
export const SEARCH_DROPDOWN_TRACKS_RECEIVED = 'SEARCH_DROPDOWN_TRACKS_RECEIVED';

export const SEARCH_FAILURE = 'SEARCH_FAILURE';


export const SHOW_DROPDOWN_SEARCH_RESULTS = 'SHOW_DROPDOWN_SEARCH_RESULTS';
export const HIDE_DROPDOWN_SEARCH_RESULTS = 'HIDE_DROPDOWN_SEARCH_RESULTS';
export const CLEAR_DROPDOWN_SEARCH_RESULTS = 'CLEAR_DROPDOWN_SEARCH_RESULTS';

/* Artist Action Types */
export const ARTIST_REQUEST = 'ARTIST_REQUEST';
export const ARTIST_RECEIVE = 'ARTIST_RECEIVE';
export const ARTIST_FAILURE = 'ARTIST_FAILURE';

export const ARTIST_TRACKS_REQUEST = 'ARTIST_TRACKS_REQUEST';
export const ARTIST_TRACKS_RECEIVE = 'ARTIST_TRACKS_RECEIVE';
export const ARTIST_TRACKS_FAILURE = 'ARTIST_TRACKS_FAILURE';

/* Charts Action Types */
export const CHARTS_CHANGE_GENRE = 'CHARTS_CHANGE_GENRE';
export const CHARTS_REQUEST = 'CHARTS_REQUEST';
export const CHARTS_RECEIVE = 'CHARTS_RECEIVE';
export const CHARTS_FAILURE = 'CHARTS_FAILURE';

/* Track Action Types */
export const TRACK_REQUEST = 'TRACK_REQUEST';
export const TRACK_RECEIVE = 'TRACK_RECEIVE';
export const TRACK_FAILURE = 'TRACK_FAILURE';
export const TRACKS_REQUEST = 'TRACKS_REQUEST';
export const TRACKS_RECEIVE = 'TRACKS_RECEIVE';
export const TRACKS_FAILURE = 'TRACKS_FAILURE';
export const LOAD_PLAYLIST = 'LOAD_PLAYLIST';
export const TRACK_COMMENTS_REQUEST = 'TRACK_COMMENTS_REQUEST';
export const TRACK_COMMENTS_RECEIVE = 'TRACK_COMMENTS_RECEIVE';
export const TRACK_COMMENTS_FAILURE = 'TRACK_COMMENTS_FAILURE';
