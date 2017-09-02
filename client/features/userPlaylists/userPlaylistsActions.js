import { mergeEntities } from 'features/entities/entitiesActions';
import * as types from './userPlaylistsActionTypes';
import { fetchMyPlaylists } from './userPlaylistsApi';

export function startFetchingPlaylists() {
  return {
    type: types.USER_PLAY_QUEUES_FETCH_START,
  };
}

export function stopFetchingPlaylists() {
  return {
    type: types.USER_PLAY_QUEUES_FETCH_STOP,
  };
}

export function mergePlayQueues(playlistIds) {
  return {
    type: types.USER_PLAY_QUEUES_MERGE,
    payload: {
      playlistIds,
    },
  };
}

export function receivePlaylists(normalized) {
  return (dispatch) => {
    const { entities, result } = normalized;
    dispatch(mergeEntities(entities));
    dispatch(mergePlayQueues(result));
    dispatch(stopFetchingPlaylists());
  };
}

export function loadPlaylists() {
  return (dispatch) => {
    dispatch(startFetchingPlaylists());
    fetchMyPlaylists().then((normalized) => {
      console.log(normalized);
      dispatch(receivePlaylists(normalized));
    });
  };
}
