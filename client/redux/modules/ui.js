import { fromJS } from 'immutable';
import { CHARTS_RECEIVE, TRACK_RECEIVE } from 'client/constants/ActionTypes';

const LOAD_VISIBLE_TRACKS = 'LOAD_VISIBLE_TRACKS';
const CLEAR_VISIBLE_TRACKS = 'CLEAR_VISIBLE_TRACKS';

export const clearVisibleTracks = () => ({
  type: CLEAR_VISIBLE_TRACKS
});

export const loadVisibleTrackIds = trackIds => ({
  type: LOAD_VISIBLE_TRACKS,
  payload: trackIds
});

const INITIAL_STATE = fromJS({
  // Store a list of ids that are currently visible
  visibleTrackIds: []
});

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_VISIBLE_TRACKS:
      return state.set('visibleTrackIds', fromJS([]));
    // Not used for now.
    case LOAD_VISIBLE_TRACKS:
      return state.set('visibleTrackIds', fromJS(action.payload));
    case CHARTS_RECEIVE:
      return state.merge({
        visibleTrackIds: state.get('visibleTrackIds')
          .concat(fromJS(action.payload.result.map(String)))
      });
    case TRACK_RECEIVE:
      return state.merge({
        visibleTrackIds: state.get('visibleTrackIds').concat(action.payload.result.toString())
      });
    default:
      return state;
  }
};

export const getVisibleTrackIds = state => state.get('visibleTrackIds');

export default ui;
