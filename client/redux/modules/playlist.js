import { fromJS } from 'immutable';
import { INIT_PLAYLIST, ADD_TO_PLAYLIST, TOGGLE_PLAYLIST } from 'client/constants/ActionTypes';
import {
  isPlaylistEmpty,
  getPlaylistTrackIds,
  getPlayerTrackId,
  getVisibleTrackIds
} from './reducers';
/* Actions */
export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

/**
 * Load currently visible charts to our playlist
 * @return Action
 */
export const initPlaylist = trackIds => ({
  type: INIT_PLAYLIST,
  payload: trackIds
});

/**
 * [addToPlaylist description]
 * @param {[type]} trackId  [description]
 * @param {[type]} position The index where to insert the new track
 */
export const addToPlaylist = (trackId, position) => ({
  type: ADD_TO_PLAYLIST,
  payload: {
    trackId,
    position
  }
});

/* Thunks logic */
export const initPlaylistIfNeeded = trackIds => (dispatch, getState) => {
  const state = getState();
  if (isPlaylistEmpty(state)) {
    dispatch(initPlaylist(trackIds));
  }
};

export const addToPlaylistIfNeeded = trackId => (dispatch, getState) => {
  const state = getState();
  const playlistTrackIds = getPlaylistTrackIds(state);
  const playerTrackId = getPlayerTrackId(state);
  if (playlistTrackIds.indexOf(trackId) === -1) {
    // Add it right after playerTrackId
    const insertPosition = playlistTrackIds.indexOf(playerTrackId) + 1;
    dispatch(addToPlaylist(trackId, insertPosition));
  }
};

/**
 * Logic: When user click a song, if our playlist is empty,
 * we need to initialize the playlist with every tracks after the track user clicked
 * from currently visible track list.
 * If playlist is not empty, we add to playlist only when the new track
 * is not already in the playlist and it should be added
 * right after the currently active track.
 *
 * @param  {[type]} trackId [description]
 * @return {[type]}         [description]
 */
export const updatePlaylistIfNeeded = trackId => (dispatch, getState) => {
  const state = getState();
  if (isPlaylistEmpty(state)) {
    const visibleTrackIds = getVisibleTrackIds(state);
    const initPlaylistTrackIds = visibleTrackIds.slice(visibleTrackIds.indexOf(trackId));
    dispatch(initPlaylist(initPlaylistTrackIds));
  } else {
    // check if track is already in current playlist
    dispatch(addToPlaylistIfNeeded(trackId));
    console.log('Insert trackId right after current playerId');
  }
};

/* Reducer */
const INITIAL_STATE = fromJS({
  trackIds: [],
  hidden: true
});

const playlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_PLAYLIST:
      return state.set('hidden', !state.get('hidden'));
    case INIT_PLAYLIST:
      return state.set('trackIds', fromJS(action.payload));
    case ADD_TO_PLAYLIST:
      return state.set('trackIds',
        state.get('trackIds').insert(action.payload.position, action.payload.trackId));
    default:
      return state;
  }
};

export const isPlaylistHidden = state => state.get('hidden');
export const getTrackIds = state => state.get('trackIds');

export const isEmpty = state => getTrackIds(state).isEmpty();

export default playlist;
