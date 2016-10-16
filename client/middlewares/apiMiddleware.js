import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import { CLIENT_ID } from 'client/constants/Config';

export const CALL_API = 'CALL_API';
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, schema, responseType) => {
  const finalUrl = `${endpoint}`;
  return fetch(finalUrl)
    .then(response => response.json())
    .then((json) => {
      const camelizedJson = camelizeKeys(json);
      if (responseType === 'single') {
        return Object.assign({}, normalize(camelizedJson, schema));
      } else if (responseType === 'collection') {
        const { nextHref, collection } = camelizedJson;
        return Object.assign({}, normalize(collection, schema), { nextHref });
      }
      // Not sure what to do here.
console.log('Should not be reached');
      return Object.assign({}, camelizedJson);
    });

  // return fetch(endpoint)
  //   .then(response => response.json().then((json) => {
  //     return callback(json);
  //   }));
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

  const { endpoint, types, schema, responseType } = callAPI;
  const [requestType, successType, failureType] = types;
  // Start request
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, responseType)
  .then(
    response => next(actionWith({
      type: successType,
      payload: response
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
