import { fromJS } from 'immutable';
import { TRACK_RECEIVED } from 'client/redux/modules/track';
import { CHARTS_RECEIVED } from 'client/redux/modules/charts';

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
    case CHARTS_RECEIVED:
      return state.merge({
        visibleTrackIds: state.get('visibleTrackIds')
          .concat(fromJS(action.payload.result.map(String)))
      });
    case TRACK_RECEIVED:
      return state.merge({
        visibleTrackIds: state.get('visibleTrackIds').concat(action.payload.result.toString())
      });
    default:
      return state;
  }
};

export const getVisibleTrackIds = state => state.get('visibleTrackIds');
export const isFetching = state => state.get('fetching');

export default ui;
