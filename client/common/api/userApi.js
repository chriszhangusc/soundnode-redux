import SC from 'soundcloud';
import { camelizeKeys } from 'humps';
// import { SC_API_V1, SC_API_V2 } from 'common/constants/apiConsts';
// import { makeRequest } from 'common/utils/apiUtils';

export function fetchUserById(id) {
  return SC.get(`/users/${id}`).then(camelizeKeys);
}

export function searchUsers(query, limit) {
  return SC.get('/users', {
    q: query,
    limit,
  }).then(camelizeKeys);
}
