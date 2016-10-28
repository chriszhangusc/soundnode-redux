import { fromJS } from 'immutable';
import { TRACK_RECEIVED } from 'client/redux/modules/track';
import { CHARTS_RECEIVED } from 'client/redux/modules/charts';

const VISIBLE_TRACK_LIMIT = 50;

const LOAD_VISIBLE_TRACKS = 'LOAD_VISIBLE_TRACKS';
const CLEAR_VISIBLE_TRACKS = 'CLEAR_VISIBLE_TRACKS';

export const clearVisibleTracks = () => ({
  type: CLEAR_VISIBLE_TRACKS,
});

export const loadVisibleTrackIds = trackIds => ({
  type: LOAD_VISIBLE_TRACKS,
  payload: trackIds,
});

const INITIAL_STATE = fromJS({
  // Store a list of ids that are currently visible
  visibleTrackIds: [],
});

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_VISIBLE_TRACKS:
      return state.set('visibleTrackIds', fromJS([]));
    case CHARTS_RECEIVED:
      return state.merge({
        visibleTrackIds: state.get('visibleTrackIds')
          .concat(fromJS(action.payload.result)).slice(0, VISIBLE_TRACK_LIMIT),
      });
    case TRACK_RECEIVED:
      return state.merge({
        visibleTrackIds: state.get('visibleTrackIds').concat(String(action.payload.result)).slice(0, VISIBLE_TRACK_LIMIT),
      });
    default:
      return state;
  }
};

export const getUIState = state => state.get('ui');
export const getVisibleTrackIds = state => getUIState(state).get('visibleTrackIds');

export default ui;
