import * as TYPES from 'client/features/dropdownSearch/dropdownSearchConsts';

/* Reducers */
const INITIAL_STATE = {
  hidden: true,
  fetching: false,
  userIds: [],
  trackIds: [],
};

export default function dropdownSearchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.DROPDOWN_SEARCH_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case TYPES.DROPDOWN_SEARCH_END:
      return {
        ...state,
        fetching: false,
      };

    case TYPES.DROPDOWN_SEARCH_FAILED:
      return {
        ...state,
        fetching: false,
      };

    case TYPES.DROPDOWN_SEARCH_USERS_RECEIVED:
      return {
        ...state,
        userIds: [...action.payload.result],
      };

    case TYPES.DROPDOWN_SEARCH_TRACKS_RECEIVED:
      return {
        ...state,
        trackIds: [...action.payload.result],
      };

    case TYPES.DROPDOWN_SEARCH_RESULTS_HIDE:
      return {
        ...state,
        hidden: true,
      };

    case TYPES.DROPDOWN_SEARCH_RESULTS_SHOW:
      return {
        ...state,
        hidden: false,
      };

    case TYPES.DROPDOWN_SEARCH_RESULTS_CLEAR:
      return {
        ...state,
        userIds: [],
        trackIds: [],
      };

    default:
      return state;
  }
}
