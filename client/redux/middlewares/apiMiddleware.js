// #TODO: To be removed in the future
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import { CLIENT_ID, API_HOST } from 'client/constants/Config';
import querystring from 'querystring';

export const CALL_API = 'CALL_API';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = (endpoint, schema, query, fetchOptions) => {
  const queryString = querystring.stringify({
    ...query,
    client_id: CLIENT_ID,
  });
  const finalUrl = `${API_HOST}${endpoint}?${queryString}`;
  // console.log('Request Url: ', finalUrl);
  return fetch(finalUrl, fetchOptions)
    .then(response => response.json())
    .then((json) => {
      const camelizedJson = camelizeKeys(json);
      if (camelizedJson.collection) {
        const {
          nextHref,
          collection,
        } = camelizedJson;
        return Object.assign({}, normalize(collection, schema), {
          nextHref,
        });
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

  const {
    endpoint,
    types,
    query,
    schema,
    fetchOptions,
    } = callAPI;
  const [requestType, successType, failureType] = types;
  // Start request
  next(actionWith({
    type: requestType,
  }));
  return callApi(endpoint, schema, query, fetchOptions)
    .then(
    (response) => {
      next(actionWith({
        type: successType,
        payload: response,
        entities: response.entities,
      }));
    },
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Unknown error',
    })),
  );
};
