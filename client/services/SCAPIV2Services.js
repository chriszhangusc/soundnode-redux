// SoundCloud API V2
import axios from 'axios';
import { CLIENT_ID, API_HOST } from 'client/constants/Config';
import { concatParamsToUrl, formatGenre } from 'client/utils/FormatUtils';

export const SC_API_V2 = `${API_HOST}/sc/api-v2`;

console.log(SC_API_V2);

export function fetchCharts(genre) {
  let fetchUrl = `${SC_API_V2}/charts`;
  const formattedGenre = formatGenre(genre);
  // console.log(formattedGenre);
  const params = {
    kind: 'top',
    genre: `soundcloud:genres:${formattedGenre}`,
    offset: 0,
    limit: 50,
    client_id: CLIENT_ID
  };

  fetchUrl = concatParamsToUrl(fetchUrl, params);

  return axios.get(fetchUrl);
}
