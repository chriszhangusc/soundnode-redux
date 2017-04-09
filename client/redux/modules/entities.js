import { merge } from 'lodash';

const INITIAL_STATE = {
  tracks: {},
  artists: {},
  comments: {},
};

export default function entitiesReducer(state = INITIAL_STATE, action) {
  // Iterate through all our eneities tables, merge incoming new entities one by one.
  // Note we have to use string as key.
  if (action.entities) {
    // merge provided by lodash will recursively merge objects.
    // Also see: http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html
    return merge({}, state, action.entities);
  }
  return state;
}

export const getEntitiesState = state => state.entities;

export const getArtistById = (state, artistId) =>
  artistId && getEntitiesState(state).artists[String(artistId)];

export const getTrackById = (state, trackId) =>
  trackId && getEntitiesState(state).tracks[String(trackId)];

export const getCommentById = (state, commentId) =>
  commentId && getEntitiesState(state).comments[String(commentId)];

export function getArtistByTrackId(state, trackId) {
  const track = getTrackById(state, trackId);
  const artistId = track && track.userId;
  return getArtistById(state, artistId);
}

export function getArtistByCommentId(state, commentId) {
  const comment = getCommentById(state, commentId);
  const artistId = comment && comment.userId;
  return getArtistById(state, artistId);
}
