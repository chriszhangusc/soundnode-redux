import { fromJS } from 'immutable';
import {
  REQUEST_SONGS,
  RECEIVE_SONGS
} from 'client/constants/ActionTypes';

const PLAYLIST_INITIAL_STATE = fromJS({
  isFetching: false,
  songIds: [],
  songs: {},
  nextUrl: null
});

const playlist = (state = PLAYLIST_INITIAL_STATE, action) => {
  switch (action.type) {

    case REQUEST_SONGS:
      return state.set('isFetching', true);

    case RECEIVE_SONGS:
      // mergeDeep will merge obj correctly not lists! Have to concat lists!
      return state.mergeDeep(fromJS({
        isFetching: false,
        songIds: state.get('songIds').concat(fromJS(action.payload.songIds)),
        songs: action.payload.songs,
        nextUrl: action.payload.nextUrl
      }));

    default:
      return state;
  }
};

export const getFetchState = state => state.get('isFetching');
export const getSongIds = state => state.get('songIds').toJS(); // Immutable.Map convert to JS
export const getSongs = state => state.get('songs').toJS(); // Immutable.List convert to JS
export const getNextUrl = state => state.get('nextUrl');

export default playlist;
