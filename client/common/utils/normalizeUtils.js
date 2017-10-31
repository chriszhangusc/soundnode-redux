import { normalize } from 'normalizr';
import {
  trackSchema,
  trackArraySchema,
  playlistSchema,
  playlistArraySchema,
  userSchema,
  userArraySchema,
  commentSchema,
  commentArraySchema,
} from 'app/schema';

function normalizeResponse(jsonResponse, schema) {
  if (!schema) throw new Error('No Schema is provided to normalizeResponse function!');

  // If we have paging, there'll be a collection and nextHref
  if (jsonResponse.collection) {
    const { nextHref, collection } = jsonResponse;
    return {
      ...normalize(collection, schema),
      nextHref,
    };
  }

  return {
    ...normalize(jsonResponse, schema),
  };
}

export function normalizeTrack(response) {
  return normalizeResponse(response, trackSchema);
}

export function normalizeTracks(response) {
  return normalizeResponse(response, trackArraySchema);
}

export function normalizePlaylist(response) {
  return normalizeResponse(response, playlistSchema);
}

export function normalizePlaylists(response) {
  return normalizeResponse(response, playlistArraySchema);
}

export function normalizeUser(response) {
  return normalizeResponse(response, userSchema);
}

export function normalizeUsers(response) {
  return normalizeResponse(response, userArraySchema);
}

export function normalizeComment(response) {
  return normalizeResponse(response, commentSchema);
}

export function normalizeComments(response) {
  return normalizeResponse(response, commentArraySchema);
}
