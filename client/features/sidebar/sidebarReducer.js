import * as types from './sidebarActionTypes';

/* Reducer */
const initialState = {
  hidden: true,
};

function toggleSidebar(state) {
  return {
    ...state,
    hidden: !state.hidden,
  };
}

function showSidebar(state) {
  return {
    ...state,
    hidden: false,
  };
}

function hideSidebar(state) {
  return {
    ...state,
    hidden: true,
  };
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIDEBAR_TOGGLE:
      return toggleSidebar(state);

    case types.SIDEBAR_SHOW:
      return showSidebar(state);

    case types.SIDEBAR_HIDE:
      return hideSidebar(state);
    default:
      return state;
  }
}
