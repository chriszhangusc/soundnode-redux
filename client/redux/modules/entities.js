import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  tracks: {},
  artists: {},
  comments: {},
});


export default function entitiesReducer(state = INITIAL_STATE, action) {
  // Iterate through all our eneities tables, merge incoming new entities one by one.
  // Note we have to use string as key.
  if (action.entities) {
    return state.mergeDeep(action.entities);
  }
  return state;
}

export const getEntitiesState = state => state.get('entities');

export const getArtistById = (state, artistId) => artistId && getEntitiesState(state).get('artists').get(String(artistId));
export const getTrackById = (state, trackId) => trackId && getEntitiesState(state).get('tracks').get(String(trackId));
export const getCommentById = (state, commentId) => commentId && getEntitiesState(state).get('comments').get(String(commentId));

export function getArtistByTrackId(state, trackId) {
  const track = getTrackById(state, trackId);
  const artistId = track && track.get('userId');
  return getArtistById(state, artistId);
}

export function getArtistByCommentId(state, commentId) {
  const comment = getCommentById(state, commentId);
  const artistId = comment && comment.get('userId');
  return getArtistById(state, artistId);
}
