import * as types from './userPlaylistsActionTypes';

const initialState = {
  fetching: false,
  playlistIds: [],
};

export function startFetchingUserPlaylists(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function stopFetchingUserPlaylists(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function mergeUserPlaylists(state, { playlistIds }) {
  return {
    ...state,
    playlistIds,
  };
}

export default function userPlaylistsReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_PLAY_QUEUES_FETCH_START:
      return startFetchingUserPlaylists(state);

    case types.USER_PLAY_QUEUES_FETCH_STOP:
      return stopFetchingUserPlaylists(state);

    case types.USER_PLAY_QUEUES_MERGE:
      return mergeUserPlaylists(state, action.payload);

    default:
      return state;
  }
}
