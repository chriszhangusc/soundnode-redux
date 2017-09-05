import { SIDEBAR_TOGGLE } from './sidebarActionTypes';

/* Reducer */
const initialState = {
  hidden: true,
  selectedTab: 'Top 50',
};

function toggleSidebar(state) {
  return {
    ...state,
    hidden: !state.hidden,
  };
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return toggleSidebar(state);
    default:
      return state;
  }
}
