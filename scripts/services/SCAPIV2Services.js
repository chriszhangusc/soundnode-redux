// SoundCloud API V2
import axios from 'axios';
import { CLIENT_ID } from 'client/constants/Config';
import { concatParamsToUrl, formatGenre } from 'client/utils/FormatUtils';
import { normalizeTracks } from 'client/utils/NormalizeUtils';

export const SC_API_V2 = 'http://localhost:3001/sc/api-v2';

export function fetchCharts(genre) {
  let fetchUrl = `${SC_API_V2}/charts`;
  const formattedGenre = formatGenre(genre);
  // console.log(formattedGenre);
  const params = {
    kind: 'top',
    genre: `soundcloud:genres:${formattedGenre}`,
    offset: 0,
    limit: 51,
    client_id: CLIENT_ID
  };

  fetchUrl = concatParamsToUrl(fetchUrl, params);

  return axios.get(fetchUrl).then((res) => {
    // console.log(res.data);
    const normalizedTracks = normalizeTracks(res.data);
    // console.log(normalizedTracks);
    return normalizedTracks;
  });
}
