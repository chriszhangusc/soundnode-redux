import {
  activateOverlayLoader,
  deactivateOverlayLoader,
} from 'features/globalOverlayLoader/globalOverlayLoaderActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { PLAYLISTS_MERGE } from 'features/playlists/playlistsActionTypes';
import { fetchMyPlaylists } from './playlistsApi';

export function mergePlaylists(playlistIds) {
  return {
    type: PLAYLISTS_MERGE,
    payload: {
      playlistIds,
    },
  };
}

export function loadPlaylists() {
  return (dispatch) => {
    dispatch(activateOverlayLoader());
    fetchMyPlaylists().then((normalized) => {
      // console.log(normalized);
      const { entities, result } = normalized;
      // Merge entities
      dispatch(mergeEntities(entities));
      // Update playlists store
      dispatch(mergePlaylists(result));
      // Stop global spinner
      dispatch(deactivateOverlayLoader());
    });
  };
}
