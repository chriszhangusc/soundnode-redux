import { camelizeKeys } from 'humps';
import pick from 'lodash/pick';
import SC from 'soundcloud';
import { normalize } from 'normalizr';
import { trackArraySchema, userArraySchema } from 'client/app/schema';

export function fetchDropdownSearchTracks(keyword, limit = 5) {
  return SC.get('/tracks', {
    q: keyword,
    limit,
  })
    .then(json => camelizeKeys(json))
    .then(tracks => tracks.map(track => pick(track, ['id', 'title', 'artworkUrl'])))
    .then(transformed => normalize(transformed, trackArraySchema));
}

export function fetchDropdownSearchUsers(keyword, limit = 5) {
  return SC.get('/users', {
    q: keyword,
    limit,
  })
  .then(json => camelizeKeys(json))
  .then(transformed => normalize(transformed, userArraySchema));
}
