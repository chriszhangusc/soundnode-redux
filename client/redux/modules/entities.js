import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  tracks: {},
  artists: {},
  comments: {}
});


export default function entities(state = INITIAL_STATE, action) {
  // Iterate through all our eneities tables, merge incoming new entities one by one.
  // Note we have to use string as key.
  if (action.entities) {
    return state.mergeDeep(action.entities);
  }
  return state;
}

export const getState = state => state.get('entities');

export const getArtistById = (state, artistId) => artistId && getState(state).get('artists').get(artistId.toString());
export const getTrackById = (state, trackId) => trackId && getState(state).get('tracks').get(trackId.toString());
export const getCommentById = (state, commentId) => commentId && getState(state).get('comments').get(commentId.toString());

export const getArtistByTrackId = (state, trackId) => {
  const track = getTrackById(state, trackId);
  const artistId = track && track.get('userId');
  return getArtistById(state, artistId);
};

export const getArtistByCommentId = (state, commentId) => {
  const comment = getCommentById(state, commentId);
  const artistId = comment && comment.get('userId');
  return getArtistById(state, artistId);
};
