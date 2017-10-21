import SC from 'soundcloud';
import { SC_API_V1 } from 'common/constants/apiConsts';
// import { normalizeResponse } from 'common/utils/normalizeUtils';
import { makeRequest } from 'common/utils/apiUtils';

export function removePlaylist(playlistId) {
  const requestUrl = `${SC_API_V1}/playlists/${playlistId}`;
  return makeRequest(requestUrl, { method: 'DELETE' });
}


export function addTrackToPlaylist(trackId, userId = 250047142, playlistId = 357317107) {
  const requestUrl = `${SC_API_V1}/users/${userId}/playlists/${playlistId}`;
  // https://api.soundcloud.com/playlists/357317107.json?&oauth_token=1-283018-250047142-67772dd734f9f
  return makeRequest(requestUrl).then((response) => {
    const putUrl = `https://api.soundcloud.com/playlists/${playlistId}.json?&oauth_token=1-283018-250047142-67772dd734f9f`;
    // fetch single track
    // https://api.soundcloud.com/tracks/13158665
    SC.get(`/tracks/${trackId}`).then((track) => {
      const tracks = [...response.tracks, track];
      const data = {
        playlist: {
          tracks,
        },
      };
      // console.log(JSON.stringify(playlistUpdater));
      fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(json => console.log(json));
    });
  });
}
