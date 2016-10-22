import { fromJS } from 'immutable';
import Track from 'client/models/Track';
import Artist from 'client/models/Artist';
import Comment from 'client/models/Comment';

const INITIAL_STATE = fromJS({
  tracks: {},
  artists: {},
  comments: {}
});

function mergeEntities(state, entityName, entityMap, RecordType) {
  return state.mergeIn([entityName], entityMap.map(entity => new RecordType(entity)));
}

export default function entities(state = INITIAL_STATE, action) {
  const modelMapper = {
    tracks: Track,
    artists: Artist,
    comments: Comment
  };

  // Iterate through all our eneities tables, merge incoming new entities one by one.
  // Note we have to use string as key.
  if (action.entities) {
    const [...keys] = state.keys(); // Note the way to extract immutable Iterator as array
    let newState = state;
    keys.forEach((key) => {
      if (action.entities[key]) {
        newState = mergeEntities(newState, key, fromJS(action.entities[key]), modelMapper[key]);
      }
    });
    return newState;
  }
  return state;
}

export const getAllTracks = state => state.get('tracks');
export const getAllArtists = state => state.get('artists');

// export function getArtistsByIdsAsMap(state, artistIds) {
//   return state.get('artists').filter(artistIds);
// }

export function getArtistById(state, artistId) {
  return artistId && state.get('artists').get(artistId.toString());
}

// Grap a bunch of tracks specified by List of ids.
// Note that immutable map is keyed only by string!!
export function getTrackById(state, trackId) {
  return trackId && state.get('tracks').get(trackId.toString());
}

export function getCommentById(state, commentId) {
  return commentId && state.get('comments').get(commentId.toString());
}

// export function getTracksByIdsAsArray(state, trackIds) {
//   return trackIds.map(trackId => getTrackById(trackId));
// }

// export function getComments(commentIds) {
//
// }
