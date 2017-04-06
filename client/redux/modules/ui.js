// The ui module is managing the UI state. Currently it is only in charge of
// visible tracks on the current page, like everytime we switch to a new category in charts page,
// we update the visible tracks.
import { CHARTS_RECEIVED } from 'client/redux/modules/charts';

// const VISIBLE_TRACK_LIMIT = 50;

const LOAD_VISIBLE_TRACKS = 'LOAD_VISIBLE_TRACKS';
const CLEAR_VISIBLE_TRACKS = 'CLEAR_VISIBLE_TRACKS';

export const clearVisibleTracks = () => ({
  type: CLEAR_VISIBLE_TRACKS,
});

export const loadVisibleTrackIds = trackIds => ({
  type: LOAD_VISIBLE_TRACKS,
  payload: trackIds,
});

const INITIAL_STATE = {
  // Store a list of ids that are currently visible
  visibleTrackIds: [],
};

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_VISIBLE_TRACKS:
      return {
        ...state,
        visibleTrackIds: [],
      };
    case CHARTS_RECEIVED:
      return {
        ...state,
        // Visible track limit is the same as track limit in charts
        visibleTrackIds: [
          ...state.visibleTrackIds,
          ...action.payload.result,
        ],
      };
    // case TRACK_RECEIVED:
    //   return state.merge({
    //     visibleTrackIds: state.get('visibleTrackIds').concat(String(action.payload.result)).slice(0, VISIBLE_TRACK_LIMIT),
    //   });
    default:
      return state;
  }
};

export const getUIState = state => state.ui;
export const getVisibleTrackIds = state => getUIState(state).visibleTrackIds;

export default ui;
