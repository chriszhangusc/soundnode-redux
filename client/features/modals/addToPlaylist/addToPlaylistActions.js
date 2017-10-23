import { normalizeResponse } from 'common/utils/normalizeUtils';
import { playlistArraySchema } from 'app/schema';
import { mergeEntities } from 'features/entities/entitiesActions';
import { notificationSuccess, defaultWarning } from 'features/notification/notificationActions';
import { fetchMyPlaylists, deleteSinglePlaylist } from 'common/services/scApiService';
import { updatePlaylists } from 'features/playlists/playlistsActions';

export function fetchPlaylists() {
  return dispatch => {
    fetchMyPlaylists()
      .then(response => normalizeResponse(response, playlistArraySchema))
      .then(normalized => {
        const { entities, result } = normalized;
        // Merge entities
        dispatch(mergeEntities(entities));
        // Update playlists store
        dispatch(updatePlaylists(result));
      })
      .catch(err => {
        // notification warning
        dispatch(defaultWarning());
        console.log(err);
      });
  };
}
