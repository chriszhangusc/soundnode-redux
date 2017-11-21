import SC from 'soundcloud';
import { SC_API_V1 } from 'common/constants/apiConsts';
import { makeRequest, requestPut, requestDelete } from 'common/utils/apiUtils';

export function removePlaylist(playlistId) {
  const requestUrl = `${SC_API_V1}/playlists/${playlistId}`;
  return requestDelete(requestUrl);
}

export function addTrackToPlaylist(trackId, userId, playlistId) {
  const requestUrl = `${SC_API_V1}/users/${userId}/playlists/${playlistId}`;
  // https://api.soundcloud.com/playlists/357317107.json?&oauth_token=1-283018-250047142-67772dd734f9f
  return makeRequest(requestUrl).then(response =>
    // fetch single track
    // https://api.soundcloud.com/tracks/13158665
    SC.get(`/tracks/${trackId}`).then((track) => {
      const tracks = [...response.tracks, track];
      const data = {
        playlist: {
          tracks,
        },
      };

      const putUrl = `${SC_API_V1}/playlists/${playlistId}`;

      return requestPut(putUrl, data);
    }),
  );
}

export function removeTrackFromPlaylist(trackId, userId, playlistId) {
  const requestUrl = `${SC_API_V1}/users/${userId}/playlists/${playlistId}`;
  // https://api.soundcloud.com/playlists/357317107.json?&oauth_token=1-283018-250047142-67772dd734f9f
  return makeRequest(requestUrl).then(response =>
    // fetch single track
    // https://api.soundcloud.com/tracks/13158665
    SC.get(`/tracks/${trackId}`).then(() => {
      // const tracks = [...response.tracks, track];
      const tracks = response.tracks.filter(t => t.id !== trackId);

      const data = {
        playlist: {
          tracks,
        },
      };

      const putUrl = `${SC_API_V1}/playlists/${playlistId}`;

      return requestPut(putUrl, data);
    }),
  );
}
