import { SIDEBAR_SHOW, SIDEBAR_HIDE } from './sidebarActionTypes';
import { isSidebarHidden } from './sidebarSelectors';

export function showSidebar() {
  return {
    type: SIDEBAR_SHOW,
  };
}

export function hideSidebar() {
  return {
    type: SIDEBAR_HIDE,
  };
}

export function toggleSidebar() {
  return (dispatch, getState) => {
    const state = getState();
    const sidebarHidden = isSidebarHidden(state);
    if (sidebarHidden) {
      dispatch(showSidebar());
    } else {
      dispatch(hideSidebar());
    }
  };
}
