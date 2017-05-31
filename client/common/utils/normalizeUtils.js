import { normalize } from 'normalizr';

export function normalizeResponse(jsonResponse, schema) {
  if (!schema) throw new Error('No Schema is provided to normalizeResponse function!');
  if (jsonResponse.collection) {
    const { nextHref, collection } = jsonResponse;
    // return Object.assign({}, normalize(collection, schema), { nextHref });
    return {
      ...normalize(collection, schema),
      nextHref,
    };
  }

  return {
    ...normalize(jsonResponse, schema),
  };
}
