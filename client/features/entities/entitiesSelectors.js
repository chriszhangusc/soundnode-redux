import { createSelector } from 'reselect';

/**
 * Get the entities state from global state
 * @param {object} state Global state object
 * @returns {object} Entities state
 */
export const getEntities = state => state.entities;

export const getUsers = createSelector(getEntities, entities => entities.users);

export const getTracks = createSelector(getEntities, entities => entities.tracks);

/**
 * Returns user object by userId
 * @param {object} state Global state object
 * @param {number} userId UserId field of an user object
 * @returns {object} Artist object whose id equals to userId
 */
export const getUserById = (state, userId) => userId && getEntities(state).users[String(userId)];

/**
 * Returns track object by trackId
 * @param {object} state global state object
 * @param {number} trackId trackId field of a sound track object
 * @returns {object} Track object whose id is trackId or undefined if the trackId is not valid.
 */
export const getTrackById = (state, trackId) =>
  trackId && getEntities(state).tracks[String(trackId)];

/**
 * Returns comment object by commentId
 * @param {object} state Global state
 * @param {number} commentId CommentId field of an comment object
 * @returns {object} Comment object whose id equals commentId
 */
export const getCommentById = (state, commentId) =>
  commentId && getEntities(state).comments[String(commentId)];

/**
 * Returns the Artist object of a track specified by trackId
 * @param {Object} state Global state object
 * @param {Number} trackId The id of the track
 * @returns {Object} Artist object who is the owner of track specified by trackId
 */
export function getUserByTrackId(state, trackId) {
  const track = getTrackById(state, trackId);
  const userId = track && track.userId;
  return getUserById(state, userId);
}

/**
 * Returns user object who made the comment specified by commentId
 * @param {Object} state Global state object
 * @param {Number} commentId The id of the comment
 * @returns {Object} Artist object
 */
export function getUserByCommentId(state, commentId) {
  const comment = getCommentById(state, commentId);
  const userId = comment && comment.userId;
  return getUserById(state, userId);
}

export function getPlaylistById(state, playlistId) {
  return playlistId && getEntities(state).playlists[String(playlistId)];
}
