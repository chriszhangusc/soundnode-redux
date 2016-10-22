import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import { CLIENT_ID } from 'client/constants/Config';
import querystring from 'querystring';

export const CALL_API = 'CALL_API';
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, query, schema, method = 'get', data) => {
  // Append ClientId
  const queryString = querystring.stringify({ ...query, client_id: CLIENT_ID });
  const finalUrl = `http://localhost:3000${endpoint}?${queryString}`;

  const fetchOptions = {
    method
  };
  if (method === 'post' || method === 'POST') {
    fetchOptions.headers = { 'Content-Type': 'application/json' };
    fetchOptions.body = JSON.stringify({ ...data });
  }
  // console.log(fetchOptions);
  return fetch(finalUrl, fetchOptions)
    .then(response => response.json())
    .then((json) => {
      const camelizedJson = camelizeKeys(json);
      console.log(camelizedJson);
      if (camelizedJson.collection) {
        const { nextHref, collection } = camelizedJson;
        return Object.assign({}, normalize(collection, schema), { nextHref });
      }
      return Object.assign({}, normalize(camelizedJson, schema));
    });
};

export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  // Inner function
  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const { endpoint, types, query, schema, method, data } = callAPI;
  const [requestType, successType, failureType] = types;
  // Start request
  next(actionWith({ type: requestType }));

  return callApi(endpoint, query, schema, method, data)
  .then(
    response => next(actionWith({
      type: successType,
      payload: response,
      entities: response.entities
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
