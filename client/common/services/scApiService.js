import SC from 'soundcloud';
import { SC_API_V1 } from 'common/constants/apiConsts';
import { makeRequest } from 'common/utils/apiUtils';

// FIXME: Not a good name
export function fetchMyPlaylists() {
  const requestUrl = `${SC_API_V1}/me/playlists?limit=10&format=json`;
  return makeRequest(requestUrl);
}

export function removePlaylist(playlistId) {
  const requestUrl = `${SC_API_V1}/playlists/${playlistId}`;
  return makeRequest(requestUrl, { method: 'DELETE' });
}

export function removeTrackFromPlaylist(trackId, userId, playlistId) {
  const requestUrl = `${SC_API_V1}/users/${userId}/playlists/${playlistId}`;
  // https://api.soundcloud.com/playlists/357317107.json?&oauth_token=1-283018-250047142-67772dd734f9f
  return makeRequest(requestUrl).then((response) => {
    const putUrl = `https://api.soundcloud.com/playlists/${playlistId}.json?&oauth_token=1-283018-250047142-67772dd734f9f`;
    // fetch single track
    // https://api.soundcloud.com/tracks/13158665
    return SC.get(`/tracks/${trackId}`).then(() => {
      // const tracks = [...response.tracks, track];
      const tracks = response.tracks.filter(t => t.id !== trackId);
      const data = {
        playlist: {
          tracks,
        },
      };
      return fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    });
  });
}

export function addTrackToPlaylist(trackId, userId, playlistId) {
  const requestUrl = `${SC_API_V1}/users/${userId}/playlists/${playlistId}`;
  // https://api.soundcloud.com/playlists/357317107.json?&oauth_token=1-283018-250047142-67772dd734f9f
  return makeRequest(requestUrl).then((response) => {
    const putUrl = `https://api.soundcloud.com/playlists/${playlistId}.json?&oauth_token=1-283018-250047142-67772dd734f9f`;
    // fetch single track
    // https://api.soundcloud.com/tracks/13158665
    return SC.get(`/tracks/${trackId}`).then((track) => {
      const tracks = [...response.tracks, track];
      const data = {
        playlist: {
          tracks,
        },
      };
      return fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    });
  });
}
