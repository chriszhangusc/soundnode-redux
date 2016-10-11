import { fromJS } from 'immutable';
import * as ActionTypes from 'client/constants/ActionTypes';
import { INITIAL_VOLUME, DEFAULT_MODE } from 'client/constants/PlayerConstants';
import Track from 'client/models/Track';
/* Player Reducers */
const INITIAL_STATE = fromJS({
  currentTime: 0,
  volume: INITIAL_VOLUME,
  track: new Track(),
  isPlaying: false,
  isSeeking: false,
  volumeIsSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE,
  showPlaylist: false, // Should be moved to playlist!
  shuffleDraw: [],
  shuffleDiscard: []
});

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.TOGGLE_PLAYLIST:
      return state.set('showPlaylist', !state.get('showPlaylist'));

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
      return state.mergeDeep({
        shuffleDraw: action.payload,
        shuffleDiscard: []
      });

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

export const getShowPlaylist = state => state.get('showPlaylist');
