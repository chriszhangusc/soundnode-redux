import { mergeEntities } from 'features/entities/entitiesActions';
import * as types from './userPlaylistsConsts';
import { fetchMyPlaylists } from './userPlaylistsApi';

export function startFetchingPlaylists() {
  return {
    type: types.USER_PLAYLISTS_FETCH_START,
  };
}

export function stopFetchingPlaylists() {
  return {
    type: types.USER_PLAYLISTS_FETCH_STOP,
  };
}

export function mergePlaylists(playlistIds) {
  return {
    type: types.USER_PLAYLISTS_MERGE,
    payload: {
      playlistIds,
    },
  };
}

export function receivePlaylists(normalized) {
  return (dispatch) => {
    const { entities, result } = normalized;
    dispatch(mergeEntities(entities));
    dispatch(mergePlaylists(result));
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
