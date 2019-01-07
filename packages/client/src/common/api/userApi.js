import SC from 'soundcloud';
import { camelizeKeys } from 'humps';

export function fetchUserById(id) {
  return SC.get(`/users/${id}`).then(camelizeKeys);
}

export function searchUsers(query, limit) {
  return SC.get('/users', {
    q: query,
    limit,
  }).then(camelizeKeys);
}
