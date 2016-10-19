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
