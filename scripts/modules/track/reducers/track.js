import { fromJS } from 'immutable';
import {
  TRACK_START_FETCH,
  TRACK_RECEIVED
} from 'client/constants/ActionTypes';
// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isFetching: false,
  title: '',
  description: '',
  artworkUrl: ''
});

const track = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_START_FETCH:
      return state.set('isFetching', true);
    case TRACK_RECEIVED:
      return state.merge(fromJS({
        isFetching: false,
        ...action.payload
      }));
    default:
      return state;
  }
};
export default track;

/* State Selectors */
export const getIsFetching = state => state.get('isFetching');
export const getTitle = state => state.get('title');
export const getDescription = state => state.get('description');
export const getArtworkUrl = state => state.get('artworkUrl');
