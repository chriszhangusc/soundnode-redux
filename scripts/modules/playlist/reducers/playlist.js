import { fromJS } from 'immutable';
import {
  LOAD_PLAYLIST
} from 'client/constants/ActionTypes';

/* Current Playing Playlist */
const INITIAL_STATE = fromJS({
  tracksById: {},
  trackIds: []
});

const playlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PLAYLIST:
      return fromJS({
        tracksById: action.payload.tracksById,
        trackIds: action.payload.trackIds
      });
    default:
      return state;
  }
};

export const getPlaylistMap = state => state.get('tracksById').toJS();
export const getPlaylistIds = state => state.get('trackIds').toJS();

export const getPlaylistAsArray = (state) => {
  const tracksById = getPlaylistMap(state);
  const trackIds = getPlaylistIds(state);
  return trackIds.map(id => tracksById[id]);
};

export default playlist;
