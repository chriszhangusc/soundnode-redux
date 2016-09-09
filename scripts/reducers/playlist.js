import * as ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  songs: [],
  nextUrl: null,
};

const playlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_SONGS:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.RECEIVE_SONGS:
      return {
        ...state,
        isFetching: false,
        nextUrl: action.nextUrl,
        songs: [...state.songs, ...action.songs],
      };
    default:
      return state;
  }
};


export default playlist;
