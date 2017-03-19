import {fromJS} from 'immutable';
import {INITIAL_VOLUME, DEFAULT_MODE} from 'client/constants/PlayerConstants';
import Track from 'client/models/Track';
import * as ActionTypes from 'client/constants/ActionTypes';
import {loadPlaylist} from 'client/redux/modules/playlist';

/* Pure actions */
export const beginSeek = () => ({type: ActionTypes.BEGIN_SEEK});

export const endSeek = () => ({type: ActionTypes.END_SEEK});

export const playSong = () => ({type: ActionTypes.PLAY_SONG});

export const pauseSong = () => ({type: ActionTypes.PAUSE_SONG});

export const beginVolumeSeek = () => ({type: ActionTypes.BEGIN_VOLUME_SEEK});

export const endVolumeSeek = () => ({type: ActionTypes.END_VOLUME_SEEK});

export const mute = () => ({type: ActionTypes.MUTE});

export const clearTime = () => ({type: ActionTypes.CLEAR_TIME});

/**
 * Create INIT_SHUFFLE action
 * @param  {Array}  An array of songIds
 * @return {Object} INIT_SHUFFLE action
 */
export const initShuffle = songIds => ({type: ActionTypes.INIT_SHUFFLE, payload: songIds});

/**
 * Create SHUFFLE_DRAW action
 * @param  {Number} songId The songId we want to remove from the shuffleDraw list
 * @return {Object}        SHUFFLE_DRAW action
 */
export const shuffleDraw = songId => ({type: ActionTypes.SHUFFLE_DRAW, payload: songId});

/**
 * Create SHUFFLE_DISCARD action
 * @param  {Number} songId The songId we want to add to the shuffleDiscard list
 * @return {Object}        SHUFFLE_DISCARD
 */
export const shuffleDiscard = songId => ({type: ActionTypes.SHUFFLE_DISCARD, payload: songId});

export const updateTime = currentTime => ({type: ActionTypes.UPDATE_TIME, payload: currentTime});

/**
 * Change the current song to newSong.
 * @param  {Track(Record)} newSong The Track Record model.
 * @return {Object} Action
 */
export const changeSong = newSong => ({type: ActionTypes.CHANGE_SONG, payload: newSong});

export const changeVolume = volume => ({type: ActionTypes.CHANGE_VOLUME, payload: volume});

export const changePlayMode = mode => ({type: ActionTypes.CHANGE_PLAY_MODE, payload: mode});

/* Thunks */
/**
 * Change current track to new track, and play the new track.
 * @param  {Track(Record)} track        The Track model representing a track object
 * @param  {Boolean} playlist If we should load playlist to state.
 * @return {[type]}                    [description]
 */
export const changeSongAndPlay = (track, playlist) => ((dispatch) => {
    // Get current page
    // Check if the load is actually nessary
    dispatch(loadPlaylist(playlist));
    dispatch(pauseSong());
    dispatch(changeSong(track));
    dispatch(clearTime());
    dispatch(playSong());
});

// Saga Actions (Actions that will trigger a saga and execute side effects)
export const sagaToggleMute = () => ({type: ActionTypes.SAGA_TOGGLE_MUTE});

// Import from player
export const sagaChangeSongAndPlay = songId => ({type: ActionTypes.SAGA_CHANGE_SONG_AND_PLAY, payload: songId});

export const sagaChangePlayMode = mode => ({type: ActionTypes.SAGA_CHANGE_PLAY_MODE, payload: mode});

export const sagaPlayNextSong = () => ({type: ActionTypes.SAGA_PLAY_NEXT_SONG});

export const sagaPlayPrevSong = () => ({type: ActionTypes.SAGA_PLAY_PREV_SONG});

export const sagaUpdateTimeOnPlay = newTime => ({type: ActionTypes.SAGA_UPDATE_TIME_ON_PLAY, payload: newTime});

export const sagaUpdateTimeOnSeek = newTime => ({type: ActionTypes.SAGA_UPDATE_TIME_ON_SEEK, payload: newTime});

export const sagaUpdateTimeAndEndSeek = newTime => ({type: ActionTypes.SAGA_UPDATE_TIME_AND_END_SEEK, payload: newTime});

export const sagaUpdateVolumeAndEndSeek = newVolume => ({type: ActionTypes.SAGA_UPDATE_VOLUME_AND_END_SEEK, payload: newVolume});

/* Reducer */
const INITIAL_STATE = fromJS({
    currentTime: 0,
    volume: INITIAL_VOLUME,
    track: new Track(),
    isPlaying: false,
    isSeeking: false,
    volumeIsSeeking: false,
    duration: 0,
    mode: DEFAULT_MODE,
    shuffleDraw: [],
    shuffleDiscard: []
});

const player = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.PLAY_SONG:
            return state.set('isPlaying', true);

        case ActionTypes.PAUSE_SONG:
            return state.set('isPlaying', false);

        case ActionTypes.CHANGE_SONG:
            return state.set('track', fromJS(action.payload));

        case ActionTypes.UPDATE_TIME:
            return state.set('currentTime', action.payload);

        case ActionTypes.BEGIN_SEEK:
            return state.set('isSeeking', true);

        case ActionTypes.END_SEEK:
            return state.set('isSeeking', false);

        case ActionTypes.CHANGE_VOLUME:
            return state.set('volume', action.payload);

        case ActionTypes.BEGIN_VOLUME_SEEK:
            return state.set('volumeIsSeeking', true);

        case ActionTypes.END_VOLUME_SEEK:
            return state.set('volumeIsSeeking', false);

        case ActionTypes.CHANGE_PLAY_MODE:
            return state.set('mode', action.payload);

        case ActionTypes.MUTE:
            return state.set('volume', 0);

        case ActionTypes.CLEAR_TIME:
            return state.set('currentTime', 0);

        case ActionTypes.INIT_SHUFFLE:
            // Initialize shuffleDraw with given playlist represented by songIds
            return state.mergeDeep({shuffleDraw: action.payload, shuffleDiscard: []});

            // Remove payload(songId) from shuffleDraw
        case ActionTypes.SHUFFLE_DRAW:
            return state.mergeDeep({
                shuffleDraw: state.get('shuffleDraw').filter(item => item !== action.payload)
            });

            // Add payload(songId) to shuffleDiscard
        case ActionTypes.SHUFFLE_DISCARD:
            return state.mergeDeep({
                shuffleDiscard: state.get('shuffleDiscard').push(action.payload)
            });

        default:
            return state;
    }
};
export default player;

/* Player Selectors */
export const getCurrentTrack = state => state.get('track');
export const getShuffleDraw = state => state.get('shuffleDraw').toJS();
export const getShuffleDiscard = state => state.get('shuffleDiscard').toJS();
export const shuffleInitialized = state => (getShuffleDraw(state).length > 0);
export const getPlayingState = state => state.get('isPlaying');
export const getCurrentTime = state => state.get('currentTime');
export const getSeekState = state => state.get('isSeeking');
export const getPlayerMode = state => state.get('mode');
export const getVolumeSeekState = state => state.get('volumeIsSeeking');
export const getCurrentVolume = state => state.get('volume');
